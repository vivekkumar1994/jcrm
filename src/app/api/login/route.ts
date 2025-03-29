import { prisma } from "@/app/lib/prisma"; // Prisma client import
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
    }

    // Try to find the user as an Admin
    let user = await prisma.users.findUnique({ where: { email } });

    // If not found as Admin, try finding the user as IT
    if (!user) {
      user = await prisma.register.findUnique({ where: { email } });
    }

    // If the user is still not found, return an error
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user.id, userType: user.userType }, JWT_SECRET, { expiresIn: "7d" });

    // Set cookies (no need to await)
    (await cookies()).set("authToken", token);
    (await cookies()).set("userType", user.userType);
    (await cookies()).set("userId", user.id.toString());

    // Determine the redirect path based on user type
    const redirectPath = user.userType === "admin" ? "/admin/dashboard" : "/it";

    return NextResponse.json({ message: "Login successful", redirectPath }, { status: 200 });
  } catch (error) {
    console.error("Login Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
