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
        console.log("📌 Converting request body to stream...");
        const bodyStream = Readable.from(Buffer.from(await req.arrayBuffer()));

        console.log("📌 Initializing Busboy...");
        const busboy = Busboy({ headers: Object.fromEntries(req.headers) });

        const fields: { [key: string]: string } = {};
        const files: { [key: string]: string } = {};

        busboy.on("file", async (fieldname, file, { filename }) => {
          console.log(`📁 Uploading file: ${filename}`);
          const saveTo = path.join(uploadDir, `${Date.now()}-${filename}`);
          const writeStream = fs.createWriteStream(saveTo);

          try {
            await pipeline(file, writeStream);
            files[fieldname] = saveTo.replace(process.cwd(), "");
          } catch (err) {
            console.error("❌ File upload error:", err);
            reject(NextResponse.json({ error: "File upload failed" }, { status: 500 }));
          }
        });

        busboy.on("field", (name, value) => {
          console.log(`📝 Received field: ${name} = ${value}`);
          fields[name] = value;
        });

        busboy.on("finish", async () => {
          console.log("✅ File upload & form parsing complete!");

          const sql = `INSERT INTO register (name, email, phone, address, city, state, qualification, university, graduationYear, skills, experience, availability, preferredLocation, linkedinProfile, githubProfile, resume, portfolio, certificates, gender, courseType, additionalInfo, reference, professionalRole) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

          const values = Object.values(fields);

          try {
            const [result]: any = await pool.execute(sql, values);
            console.log("✅ Database insert success:", result.insertId);
            resolve(NextResponse.json({ message: "Registration successful", id: result.insertId }));
          } catch (error) {
            console.error("❌ Database Error:", error);
            reject(NextResponse.json({ error: "Database error" }, { status: 500 }));
          }
        });

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

export async function GET() {
  try {
    const [rows]: any = await pool.query("SELECT * FROM register");
    return NextResponse.json(rows);
  } catch (error) {
    console.error("❌ Database Error:", error);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const data = await req.json();
    const { id, ...fields } = data;
    const updates = Object.keys(fields).map(key => `${key} = ?`).join(", ");
    const values = [...Object.values(fields), id];

    const sql = `UPDATE register SET ${updates} WHERE id = ?`;
    await pool.execute(sql, values);

    return NextResponse.json({ message: "Update successful" });
  } catch (error) {
    console.error("❌ Database Error:", error);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();
    if (!id) {
      return NextResponse.json({ error: "Missing ID" }, { status: 400 });
    }

    const sql = "DELETE FROM register WHERE id = ?";
    await pool.execute(sql, [id]);

    return NextResponse.json({ message: "Deletion successful" });
  } catch (error) {
    console.error("❌ Database Error:", error);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}
