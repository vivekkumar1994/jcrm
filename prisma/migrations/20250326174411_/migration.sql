/*
  Warnings:

  - You are about to drop the column `address` on the `booksession` table. All the data in the column will be lost.
  - You are about to alter the column `day` on the `booksession` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(191)`.
  - Added the required column `name` to the `BookSession` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `BookSession` table without a default value. This is not possible if the table is not empty.
  - Made the column `email` on table `booksession` required. This step will fail if there are existing NULL values in that column.
  - Made the column `phone` on table `booksession` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `booksession` DROP FOREIGN KEY `booksession_registerId_fkey`;

-- DropIndex
DROP INDEX `booksession_registerId_fkey` ON `booksession`;

-- AlterTable
ALTER TABLE `booksession` DROP COLUMN `address`,
    ADD COLUMN `name` VARCHAR(191) NOT NULL,
    ADD COLUMN `userId` VARCHAR(191) NOT NULL,
    MODIFY `day` VARCHAR(191) NOT NULL,
    MODIFY `timeSlot` VARCHAR(191) NOT NULL,
    MODIFY `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `email` VARCHAR(191) NOT NULL,
    MODIFY `phone` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `BookSession` ADD CONSTRAINT `BookSession_registerId_fkey` FOREIGN KEY (`registerId`) REFERENCES `Register`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
