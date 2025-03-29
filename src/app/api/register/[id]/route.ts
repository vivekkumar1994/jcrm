import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

interface Params {
  id: string;
}

// Correct syntax for dynamic route parameters
export async function GET(
  request: NextRequest,
  { params }: { params: Params }
) {
  try {
    const { id } = params;

    // Ensure ID is parsed correctly as an integer
    const user = await prisma.register.findUnique({
      where: { id: Number(id) }, // Convert ID properly
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
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
