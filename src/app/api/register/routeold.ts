// import { NextRequest, NextResponse } from "next/server";
// import { Readable } from "stream";
// import { prisma } from "@/app/lib/prisma";
// import Busboy from "busboy";

// export const config = {
//     api: { bodyParser: false },
// };

// // POST Route (Create)
// export async function POST(req: NextRequest) {
//     try {
//         const contentType = req.headers.get("content-type") || "";
//         if (!contentType.includes("multipart/form-data")) {
//             return NextResponse.json({ error: "Invalid content type" }, { status: 400 });
//         }

//         const bodyStream = Readable.from(Buffer.from(await req.arrayBuffer()));
//         const busboy = Busboy({ headers: Object.fromEntries(req.headers) });

//         const fields: Record<string, any> = {};
//         const filePromises: Promise<void>[] = [];

//         busboy.on("file", (fieldname, file, { mimeType }) => {
//             const filePromise = new Promise<void>(async (resolve, reject) => {
//                 if (fieldname === "resume") {
//                     try {
//                         const chunks: Buffer[] = [];
//                         for await (const chunk of file) {
//                             chunks.push(chunk);
//                         }
//                         const buffer = Buffer.concat(chunks);
//                         const base64 = buffer.toString("base64");
//                         fields["resume"] = `data:${mimeType};base64,${base64}`;
//                         resolve();
//                     } catch (error) {
//                         console.error("Error processing resume:", error);
//                         reject(error);
//                     }
//                 } else {
//                     resolve();
//                 }
//             });
//             filePromises.push(filePromise);
//         });

//         busboy.on("field", (name, value) => {
//             console.log(value, "value");
//             if (name === "graduationYear") {
//                 fields[name] = parseInt(value);
//             } else {
//                 fields[name] = value;
//             }
//         });

//         return await new Promise((resolve, reject) => {
//             busboy.on("finish", async () => {
//                 try {
//                     await Promise.all(filePromises);
//                     const record = await prisma.register.create({
//                         data: fields,
//                     });
//                     resolve(NextResponse.json({ message: "Registration successful", id: record.id }));
//                 } catch (error) {
//                     console.error("❌ Prisma Error:", error);
//                     reject(NextResponse.json({ error: "Database error", details: error }, { status: 500 }));
//                 }
//             });
//             bodyStream.pipe(busboy);
//         });
//     } catch (error) {
//         console.error("❌ Upload error:", error);
//         return NextResponse.json({ error: "Server error" }, { status: 500 });
//     }
// }

// // GET Route (Read)
// export async function GET(req: NextRequest) {
//     try {
//         const id = req.nextUrl.searchParams.get("id");
//         const role = req.nextUrl.searchParams.get("professionalRole"); // Dynamic role filter

//         if (id) {
//             const register = await prisma.register.findUnique({
//                 where: { id: parseInt(id) },
//             });

//             if (!register) {
//                 return NextResponse.json({ error: "Register not found" }, { status: 404 });
//             }

//             return NextResponse.json(register);
//         }

//         const filters: Record<string, any> = {};
//         if (role) filters.role = role;

//         const registers = await prisma.register.findMany({
//             where: filters,
//         });

//         return NextResponse.json(registers);
//     } catch (error) {
//         console.error("❌ GET error:", error);
//         return NextResponse.json({ error: "Server error" }, { status: 500 });
//     }
// }

// // PUT Route (Update)
// export async function PUT(req: NextRequest) {
//     try {
//         const id = req.nextUrl.searchParams.get("id");
//         if (!id) {
//             return NextResponse.json({ error: "ID parameter is required" }, { status: 400 });
//         }

//         const body = await req.json();

//         const updatedRegister = await prisma.register.update({
//             where: { id: parseInt(id) },
//             data: body,
//         });

//         return NextResponse.json(updatedRegister);
//     } catch (error) {
//         console.error("❌ PUT error:", error);
//         return NextResponse.json({ error: "Database error", details: error }, { status: 500 });
//     }
// }

// // DELETE Route (Delete)
// export async function DELETE(req: NextRequest) {
//     try {
//         const id = req.nextUrl.searchParams.get("id");
//         if (!id) {
//             return NextResponse.json({ error: "ID parameter is required" }, { status: 400 });
//         }

//         await prisma.register.delete({
//             where: { id: parseInt(id) },
//         });

//         return NextResponse.json({ message: "Register deleted successfully" });
//     } catch (error) {
//         console.error("❌ DELETE error:", error);
//         return NextResponse.json({ error: "Database error", details: error }, { status: 500 });
//     }
// }


// // PATCH Route (Toggle Access)
// export async function PATCH(req: NextRequest) {
//   try {
//       const id = req.nextUrl.searchParams.get("id");
//       if (!id) {
//           return NextResponse.json({ error: "ID parameter is required" }, { status: 400 });
//       }

//       // Fetch the current record
//       const register = await prisma.register.findUnique({
//           where: { id: parseInt(id) },
//       });

//       if (!register) {
//           return NextResponse.json({ error: "Register not found" }, { status: 404 });
//       }

//       // Toggle the access field (0 or 1)
//       const updatedRegister = await prisma.register.update({
//           where: { id: parseInt(id) },
//           data: { access: register.access === 1 ? 0 : 1 }, // Corrected toggle logic
//       });

//       return NextResponse.json(updatedRegister);
//   } catch (error) {
//       console.error("❌ PATCH error:", error);
//       return NextResponse.json({ error: "Database error", details: error }, { status: 500 });
//   }
// }