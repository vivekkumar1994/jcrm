-- AlterTable
ALTER TABLE `register` ADD COLUMN `userType` VARCHAR(191) NOT NULL DEFAULT 'it';

-- AlterTable
ALTER TABLE `users` ADD COLUMN `userType` VARCHAR(191) NOT NULL DEFAULT 'admin';
