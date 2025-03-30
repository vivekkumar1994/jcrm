// import { NextResponse } from "next/server";
// import { prisma } from "@/app/lib/prisma";
// import { RouteContext } from "@/app/types/routeType"; // Adjust the import path as necessary

// export async function GET(
//   request: Request,
//   context: RouteContext
// ) {
//   try {
//     const { id } = context.params;
//     const userId = Number(id);

//     if (isNaN(userId)) {
//       return NextResponse.json(
//         { error: "Invalid user ID format" },
//         { status: 400 }
//       );
//     }

//     const user = await prisma.register.findUnique({
//       where: { id: userId },
//       select: {
//         id: true,
//         name: true,
//         email: true,
//         phone: true,
//         address: true,
//         city: true,
//         state: true,
//         qualification: true,
//         university: true,
//         graduationYear: true,
//         skills: true,
//         experience: true,
//         availability: true,
//         preferredLocation: true,
//         linkedinProfile: true,
//         githubProfile: true,
//         resume: true,
//         profilePhoto: true,
//         portfolio: true,
//         certificates: true,
//         gender: true,
//         courseType: true,
//         additionalInfo: true,
//         reference: true,
//         professionalRole: true,
//       },
//     });

//     if (!user) {
//       return NextResponse.json(
//         { error: "User not found" },
//         { status: 404 }
//       );
//     }

//     return NextResponse.json({ user }, { status: 200 });

//   } catch (error: any) {
//     console.error("Error fetching user:", error);
//     return NextResponse.json(
//       { error: "Internal Server Error", message: error.message },
//       { status: 500 }
//     );
//   }
// }
