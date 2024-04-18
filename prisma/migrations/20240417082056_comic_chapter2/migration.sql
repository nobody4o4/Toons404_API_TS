/*
  Warnings:

  - You are about to drop the column `likes` on the `Chapter` table. All the data in the column will be lost.
  - Added the required column `thumbnail` to the `ComicChapter` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Chapter" DROP COLUMN "likes";

-- AlterTable
ALTER TABLE "ComicChapter" ADD COLUMN     "thumbnail" TEXT NOT NULL,
ADD COLUMN     "views" INTEGER NOT NULL DEFAULT 0;
