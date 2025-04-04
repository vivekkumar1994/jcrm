"use server";

import { db } from "@/lib/prisma"
import { revalidatePath } from "next/cache";
import { generateAIInsights } from "./dashboard";
import { auth } from "@clerk/nextjs/server";

export async function updateUser(data) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) throw new Error("User not found");

  try {
    // Start a transaction to handle both operations
    const result = await db.$transaction(
      async (tx) => {
        // First check if industry exists
        let industryInsight = await tx.industryInsight.findUnique({
          where: {
            industry: data.industry,
          },
        });

        // If industry doesn't exist, create it with default values
        if (!industryInsight) {
          const insights = await generateAIInsights(data.industry);

          industryInsight = await db.IndustryInsight.create({
            data: {
              industry: data.industry,
              ...insights,
              nextUpdate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            },
          });
        }

        // Now update the user
        const updatedUser = await tx.user.update({
          where: {
            id: user.id,
          },
          data: {
            industry: data.industry,
            experience: data.experience,
            bio: data.bio,
            skills: data.skills,
          },
        });

        return { updatedUser, industryInsight };
      },
      {
        timeout: 10000, // default: 5000
      }
    );

    revalidatePath("/");
    return result.user;
  } catch (error) {
    console.error("Error updating user and industry:", error.message);
    throw new Error("Failed to update profile");
  }
}

export async function getUserOnboardingStatus() {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");
  
    try {
      const user = await db.user.findUnique({
        where: {
          clerkUserId: userId,
        },
        select: {
          industry: true,
        },
      });
  
      if (!user) throw new Error("User not found");
  
      return {
        isOnboarded: !!user.industry,
      };
    } catch (error) {
      console.error("Error checking onboarding status:", error.message);
      throw new Error("Failed to check onboarding status");
    }
  }
  export async function getAllUsers() {
  try {
    const users = await db.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        imageUrl: true, // Add this field
        industry: true,
        experience: true,
        bio: true,
        skills: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return users;
  } catch (error) {
    console.error("Error fetching all users:", error.message);
    throw new Error("Failed to retrieve users");
  }
}
