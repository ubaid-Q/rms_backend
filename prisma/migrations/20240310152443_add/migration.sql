-- DropIndex
DROP INDEX "Staff_email_key";

-- AlterTable
ALTER TABLE "Staff" ALTER COLUMN "email" DROP NOT NULL;
