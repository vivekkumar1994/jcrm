/*
  Warnings:

  - You are about to drop the `booksession` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `booksession` DROP FOREIGN KEY `bookSession_registerId_fkey`;

-- DropTable
DROP TABLE `booksession`;

-- CreateTable
CREATE TABLE `sessionbook` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `registerId` INTEGER NOT NULL,
    `day` VARCHAR(255) NOT NULL,
    `timeSlot` VARCHAR(50) NOT NULL,
    `createdAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `sessionbook` ADD CONSTRAINT `sessionbook_registerId_fkey` FOREIGN KEY (`registerId`) REFERENCES `register`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
