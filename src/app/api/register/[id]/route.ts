import { NextResponse } from "next/server";
import {  prisma } from "@/app/lib/prisma";


export async function GET(request: Request, { params }: { params: { id: string } }) {
    try {
        const { id } = params;

        // Find the user by ID with all the fields except the password
        const user = await prisma.register.findUnique({
            where: { id: parseInt(id) },
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
             
                // Exclude the password field
            },
        });

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        return NextResponse.json({ user }, { status: 200 });
    } catch (error) {
        console.error("Error fetching user:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
