/*
  Warnings:

  - You are about to drop the column `UserType` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "UserType",
ADD COLUMN     "userType" TEXT NOT NULL DEFAULT 'Internship';
