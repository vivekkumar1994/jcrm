/*
  Warnings:

  - Added the required column `userId` to the `booksession` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `booksession` ADD COLUMN `userId` INTEGER NOT NULL;
