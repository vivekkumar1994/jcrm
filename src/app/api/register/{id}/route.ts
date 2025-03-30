import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: { id: number } }
) {
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json(
        { error: "User ID not provided" },
        { status: 400 }
      );
    }

    const userId = id
    if (isNaN(userId)) {
      return NextResponse.json(
        { error: "Invalid user ID format" },
        { status: 400 }
      );
    }

    const user = await prisma.register.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        address: true,
        city: true,
        state: true,
        qualification: true,
        university: true,
        graduationYear: true,
        skills: true,
        experience: true,
        availability: true,
        preferredLocation: true,
        linkedinProfile: true,
        githubProfile: true,
        resume: true,
        profilePhoto: true,
        portfolio: true,
        certificates: true,
        gender: true,
        courseType: true,
        additionalInfo: true,
        reference: true,
        professionalRole: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ user }, { status: 200 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error fetching user:", error.message);
      return NextResponse.json(
        { error: "Internal Server Error", message: error.message },
        { status: 500 }
      );
    }

    // Handle non-Error cases
    console.error("Unexpected error:", error);
    return NextResponse.json(
      { error: "Internal Server Error", message: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
