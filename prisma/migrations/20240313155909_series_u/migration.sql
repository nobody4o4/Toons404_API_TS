/*
  Warnings:

  - Made the column `authorId` on table `Series` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Series" DROP CONSTRAINT "Series_authorId_fkey";

-- AlterTable
ALTER TABLE "Series" ALTER COLUMN "authorId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Series" ADD CONSTRAINT "Series_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
