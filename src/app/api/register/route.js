import fs from "fs";
import path from "path";
import multer from "multer";
import nextConnect from "next-connect";
import pool from "../../lib/db"; // Ensure correct DB connection

const uploadDir = path.join(process.cwd(), "public/uploads");

// Ensure the upload directory exists
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: uploadDir,
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

const handler = nextConnect({
  onError(error, req, res) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal server error" });
  },
  onNoMatch(req, res) {
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  },
});

handler.use(upload.fields([
  { name: "aadhar", maxCount: 1 },
  { name: "marksheets", maxCount: 10 }
]));

handler.post(async (req, res) => {
  try {
    const { name, email, phone, city, state, address } = req.body;
    const aadharPath = req.files?.aadhar?.[0]?.path || null;
    const marksheetPaths = req.files?.marksheets?.map(file => file.path).join(",") || null;

    console.log("Received Form Data:", { name, email, phone, city, state, address, aadharPath, marksheetPaths });

    // Store data in MySQL database
    const query = `
      INSERT INTO registrations (name, email, phone, address, city, state, aadhar, marksheets)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [name, email, phone, address, city, state, aadharPath, marksheetPaths];

    const [result] = await pool.query(query, values);
    console.log("DB Insert Result:", result);

    res.status(200).json({ message: "Registration successful!", id: result.insertId });
  } catch (error) {
    console.error("Error storing form data:", error);
    res.status(500).json({ message: "Failed to register" });
  }
});

export default handler;

export const config = {
  api: {
    bodyParser: false, // Required for Multer
  },
};
