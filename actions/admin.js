"use server";

import { db } from "@/lib/prisma"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const JWT_SECRET = process.env.JWT_SECRET || "mysecretkey";

export async function adminSignup({ name, email, password }) {
  const existingAdmin = await db.admin.findUnique({ where: { email } });
  if (existingAdmin) throw new Error("Admin already exists");

  const hashedPassword = await bcrypt.hash(password, 10);

  const admin = await db.admin.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  const token = jwt.sign({ id: admin.id }, JWT_SECRET, { expiresIn: "7d" });

  cookies().set("admin_token", token, {
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 7,
  });

  return { success: true };
}

export async function adminSignin({ email, password }) {
  const admin = await db.admin.findUnique({ where: { email } });
  if (!admin) throw new Error("Invalid credentials");

  const isValid = await bcrypt.compare(password, admin.password);
  if (!isValid) throw new Error("Invalid credentials");

  const token = jwt.sign({ id: admin.id }, JWT_SECRET, { expiresIn: "7d" });

  cookies().set("admin_token", token, {
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 7,
  });

  return { success: true };
}
