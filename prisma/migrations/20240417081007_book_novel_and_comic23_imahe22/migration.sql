/*
  Warnings:

  - You are about to drop the column `type` on the `Chapter` table. All the data in the column will be lost.
  - You are about to drop the column `chapterId` on the `ComicImage` table. All the data in the column will be lost.
  - Added the required column `comicChapterId` to the `ComicImage` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ComicImage" DROP CONSTRAINT "ComicImage_chapterId_fkey";

-- AlterTable
ALTER TABLE "Chapter" DROP COLUMN "type";

-- AlterTable
ALTER TABLE "ComicImage" DROP COLUMN "chapterId",
ADD COLUMN     "comicChapterId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "ComicChapter" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "bookId" TEXT NOT NULL,
    "number" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "seriesId" TEXT,

    CONSTRAINT "ComicChapter_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ComicChapter" ADD CONSTRAINT "ComicChapter_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ComicChapter" ADD CONSTRAINT "ComicChapter_seriesId_fkey" FOREIGN KEY ("seriesId") REFERENCES "Series"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ComicImage" ADD CONSTRAINT "ComicImage_comicChapterId_fkey" FOREIGN KEY ("comicChapterId") REFERENCES "ComicChapter"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
