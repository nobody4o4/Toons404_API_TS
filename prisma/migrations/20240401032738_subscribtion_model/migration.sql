/*
  Warnings:

  - You are about to drop the column `title` on the `Subscription` table. All the data in the column will be lost.
  - You are about to drop the `PaymentMethod` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "PaymentMethod" DROP CONSTRAINT "PaymentMethod_userId_fkey";

-- AlterTable
ALTER TABLE "Subscription" DROP COLUMN "title";

-- DropTable
DROP TABLE "PaymentMethod";

-- DropEnum
DROP TYPE "Provider";
