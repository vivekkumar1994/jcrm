"use server";

import { db } from "@/lib/prisma";

// Fetch all users
export async function getAllUsers() {
  return await db.user.findMany();
}

// Fetch a specific user by ID
export async function getUserById(userId) {
  return await db.user.findUnique({
    where: { id: userId },
  });
}

// Fetch booked sessions for a user
export async function getUserSessions(userId) {
  return await db.session.findMany({
    where: { userId },
    include: { user: true },
  });
}

// Book a session for a selected user
export async function bookSessionWithUser(userId, formData) {
  const { name, email, phone, date } = formData;

  return await db.session.create({
    data: {
      userId,
      bookedBy: name,
      email,
      phone,
      date: new Date(date),
    },
  });
}
