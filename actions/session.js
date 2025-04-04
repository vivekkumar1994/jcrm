"use server";

import { db } from "@/lib/prisma";

// Fetch all users
export async function getAllUsers() {
  try {
    return await db.user.findMany();
  } catch (error) {
    console.error("Error fetching users:", error);
    throw new Error("Failed to fetch users.");
  }
}

// Fetch a specific user by ID
export async function getUserById(userId) {
  try {
    if (!userId) throw new Error("Invalid user ID");

    return await db.user.findUnique({
      where: { id: userId },
    });
  } catch (error) {
    console.error("Error fetching user:", error);
    throw new Error("Failed to fetch user.");
  }
}

// Fetch booked sessions for a user
export async function getUserSessions(userId) {
  try {
    return await db.session.findMany({
      where: { userId },
      include: { user: true },
    });
  } catch (error) {
    console.error("Error fetching sessions:", error);
    throw new Error("Failed to fetch sessions.");
  }
}

// Book a session for a user
export async function bookSessionWithUser(userId, formData) {
  try {
    if (!formData) throw new Error("Missing booking details");
    const { date, bookedBy } = formData;

    const existingSession = await db.session.findFirst({
      where: { userId, date },
    });

    if (existingSession) throw new Error("You have already booked this slot.");

    return await db.session.create({
      data: {
        userId,
        date,
        bookedBy: bookedBy.name,
        email: bookedBy.email,
        phone: bookedBy.phone,
      },
    });
  } catch (error) {
    console.error("Error booking session:", error);
    throw new Error("Failed to book session.");
  }
}
