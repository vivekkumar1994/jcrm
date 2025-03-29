-- DropForeignKey
ALTER TABLE `booksession` DROP FOREIGN KEY `BookSession_registerId_fkey`;

-- AddForeignKey
ALTER TABLE `bookSession` ADD CONSTRAINT `bookSession_registerId_fkey` FOREIGN KEY (`registerId`) REFERENCES `register`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
