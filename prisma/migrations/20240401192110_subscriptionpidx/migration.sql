/*
  Warnings:

  - A unique constraint covering the columns `[pidx]` on the table `Subscription` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Subscription" ADD COLUMN     "pidx" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Subscription_pidx_key" ON "Subscription"("pidx");
