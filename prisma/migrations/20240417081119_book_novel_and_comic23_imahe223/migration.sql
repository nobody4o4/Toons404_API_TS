/*
  Warnings:

  - You are about to drop the column `seriesId` on the `ComicChapter` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "ComicChapter" DROP CONSTRAINT "ComicChapter_seriesId_fkey";

-- AlterTable
ALTER TABLE "ComicChapter" DROP COLUMN "seriesId";
