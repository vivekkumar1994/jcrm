/*
  Warnings:

  - Made the column `gender` on table `register` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `register` MODIFY `gender` TEXT NOT NULL;
