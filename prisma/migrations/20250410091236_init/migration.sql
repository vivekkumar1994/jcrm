-- DropIndex
DROP INDEX "Admin_email_key";

-- DropIndex
DROP INDEX "User_email_key";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "Designation" TEXT;
