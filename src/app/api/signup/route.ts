import { prisma } from "@/app/lib/prisma";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();

    if (!prisma) {
      throw new Error("Prisma Client is not initialized.");
    }

    console.log("Checking if user exists:", email);

    // Use the correct model name: `users`
    const existingUser = await prisma.users.findUnique({ where: { email } });

    if (existingUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 });
    }

    console.log("User does not exist. Creating a new user...");

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.users.create({
      data: { name, email, password: hashedPassword },
    });

    console.log("User created successfully:", newUser);

    return NextResponse.json(
      { message: "User registered successfully", user: newUser },
      { status: 201 }
    );
  } catch (error) {
    console.error("Signup Error:", error);

    // Handle error as an unknown type and perform a type assertion
    if (error instanceof Error) {
      return NextResponse.json(
        { error: "Internal Server Error", details: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: "Unknown Error" },
      { status: 500 }
    );
  }
}
