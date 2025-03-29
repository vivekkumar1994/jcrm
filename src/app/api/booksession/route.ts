import { prisma } from '@/app/lib/prisma'; // Import Prisma client
import { NextResponse } from 'next/server'; // Next.js response

interface BookingRequest {
  name: string;
  email: string;
  phone: string;
  selectedDay: string;
  selectedSlot: string;
  userId: string; // Foreign key from Register table
}

export async function POST(req: Request): Promise<NextResponse> {
  try {
    const requestBody = await req.json();
    console.log("Request Body:", requestBody);

    const { name, email, phone, selectedDay, selectedSlot, userId }: BookingRequest = requestBody;

    // Convert userId to integer
    const registerId = parseInt(userId);
  
    // Step 1: Check if the user exists in the `Register` table
    const userExists = await prisma.register.findUnique({
      where: { id: registerId },
    });

    if (!userExists) {
      return NextResponse.json({ error: "User not found in Register table" }, { status: 404 });
    }

    // Step 2: Create a booking session
    const result = await prisma.bookSession.create({
      data: {
        name,
        email,
        phone,
        day: selectedDay,
        timeSlot: selectedSlot,
        registerId, // Foreign key reference
        userId
      },
    });

    return NextResponse.json({ message: 'Booking Created Successfully', result });
  } catch (error: any) {
    console.error('Error creating booking:', error);
    return NextResponse.json({ error: 'Failed to create booking', details: error.message }, { status: 500 });
  }
}
