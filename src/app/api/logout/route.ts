import { NextResponse } from "next/server";

export async function GET() {
  const response = NextResponse.json({ message: "Logged out successfully" });

  // Remove authToken cookie by setting it to an expired date
  response.cookies.set("authToken", "", { expires: new Date(0), path: "/" });

  return response;
}
