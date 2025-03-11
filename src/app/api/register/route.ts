import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs";
import { Readable } from "stream";
import { pipeline } from "stream/promises";
import pool from "@/app/lib/db"; // Import MySQL connection pool
import Busboy from "busboy";

const uploadDir = path.join(process.cwd(), "public/uploads");

// Ensure the upload directory exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// ✅ Disable default body parsing in Next.js
export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req: NextRequest) {
  try {
    console.log("🔍 Checking Content-Type...");
    const contentType = req.headers.get("content-type") || "";
    if (!contentType.includes("multipart/form-data")) {
      console.error("❌ Invalid content type:", contentType);
      return NextResponse.json({ error: "Invalid content type" }, { status: 400 });
    }

    console.log("🚀 Processing request...");

    return new Promise(async (resolve, reject) => {
      try {
        // ✅ Convert `req.body` to a Node.js readable stream
        console.log("📌 Converting request body to stream...");
        const bodyStream = Readable.from(Buffer.from(await req.arrayBuffer()));

        // ✅ Initialize Busboy
        console.log("📌 Initializing Busboy...");
        const busboy = Busboy({ headers: Object.fromEntries(req.headers) });

        const fields: { [key: string]: string } = {};
        const files: { [key: string]: string } = {};

        // ✅ **Handle File Upload**
        busboy.on("file", async (fieldname, file, { filename }) => {
          console.log(`📁 Uploading file: ${filename}`);
          const saveTo = path.join(uploadDir, `${Date.now()}-${filename}`);
          const writeStream = fs.createWriteStream(saveTo);

          try {
            await pipeline(file, writeStream);
            files[fieldname] = saveTo.replace(process.cwd(), ""); // Store relative file path
          } catch (err) {
            console.error("❌ File upload error:", err);
            reject(NextResponse.json({ error: "File upload failed" }, { status: 500 }));
          }
        });

        // ✅ **Handle Form Fields**
        busboy.on("field", (name, value) => {
          console.log(`📝 Received field: ${name} = ${value}`);
          fields[name] = value;
        });

        // ✅ **Finish Parsing**
        busboy.on("finish", async () => {
          console.log("✅ File upload & form parsing complete!");

          const { name, email, phone, address, city, state } = fields;
          if (!name || !email || !phone) {
            console.error("❌ Missing required fields:", fields);
            return resolve(NextResponse.json({ error: "Missing required fields" }, { status: 400 }));
          }

          // Get uploaded file paths
          const aadhar = files["aadhar"] || null;
          const marksheets = files["marksheets"] ? files["marksheets"].toString() : null;

          console.log("📝 Inserting into database...");
          const sql = `INSERT INTO registrations (name, email, phone, address, city, state, aadhar, marksheets) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
          const values = [name, email, phone, address, city, state, aadhar, marksheets];

          try {
            const [result]: any = await pool.execute(sql, values);
            console.log("✅ Database insert success:", result.insertId);
            resolve(NextResponse.json({ message: "Registration successful", id: result.insertId }));
          } catch (error) {
            console.error("❌ Database Error:", error);
            reject(NextResponse.json({ error: "Database error" }, { status: 500 }));
          }
        });

        // ✅ **Pipe the stream to Busboy**
        bodyStream.pipe(busboy);
      } catch (err) {
        console.error("❌ Critical Error in Promise:", err);
        reject(NextResponse.json({ error: "Server error" }, { status: 500 }));
      }
    });
  } catch (error) {
    console.error("❌ Upload error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
