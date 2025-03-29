-- DropForeignKey
ALTER TABLE `booksession` DROP FOREIGN KEY `bookSession_registerId_fkey`;

-- AddForeignKey
ALTER TABLE `booksession` ADD CONSTRAINT `booksession_registerId_fkey` FOREIGN KEY (`registerId`) REFERENCES `register`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
