import {prisma} from "@/app/lib/prisma"; // Ensure correct Prisma import
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => null);
    if (!body || !body.email || !body.password) {
      return NextResponse.json({ error: "Missing email or password" }, { status: 400 });
    }

    const { email, password } = body;

    // Find user in the database
    const user = await prisma.users.findUnique({ where: { email } });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "7d" });

    // Set token in cookies (secure & HttpOnly)
    (await cookies()).set("authToken", token, {
      httpOnly: true, // Prevents client-side JavaScript access
      secure: process.env.NODE_ENV === "production", // Secure only in production
      sameSite: "strict",
      path: "/admin/users",
      maxAge: 7 * 24 * 60 * 60, // 7 days
    });

    return NextResponse.json({ message: "Login successful", token }, { status: 200 });
  } catch (error) {
    console.error("Login Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
