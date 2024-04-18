/*
  Warnings:

  - You are about to drop the column `novelId` on the `Chapter` table. All the data in the column will be lost.
  - You are about to drop the column `seriesId` on the `Forum` table. All the data in the column will be lost.
  - You are about to drop the column `novelId` on the `Likes` table. All the data in the column will be lost.
  - You are about to drop the `Novel` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `bookId` to the `Chapter` table without a default value. This is not possible if the table is not empty.
  - Added the required column `authorId` to the `Forum` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "BookType" AS ENUM ('NOVEL', 'SERIES');

-- DropForeignKey
ALTER TABLE "Chapter" DROP CONSTRAINT "Chapter_novelId_fkey";

-- DropForeignKey
ALTER TABLE "Forum" DROP CONSTRAINT "Forum_seriesId_fkey";

-- DropForeignKey
ALTER TABLE "Likes" DROP CONSTRAINT "Likes_novelId_fkey";

-- DropForeignKey
ALTER TABLE "Novel" DROP CONSTRAINT "Novel_authorId_fkey";

-- DropForeignKey
ALTER TABLE "Novel" DROP CONSTRAINT "Novel_genreId_fkey";

-- DropForeignKey
ALTER TABLE "Novel" DROP CONSTRAINT "Novel_seriesId_fkey";

-- DropForeignKey
ALTER TABLE "Novel" DROP CONSTRAINT "Novel_subGenreId_fkey";

-- DropIndex
DROP INDEX "Forum_seriesId_key";

-- AlterTable
ALTER TABLE "Chapter" DROP COLUMN "novelId",
ADD COLUMN     "bookId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Forum" DROP COLUMN "seriesId",
ADD COLUMN     "authorId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Likes" DROP COLUMN "novelId",
ADD COLUMN     "bookId" TEXT;

-- AlterTable
ALTER TABLE "Series" ADD COLUMN     "forumId" TEXT;

-- DropTable
DROP TABLE "Novel";

-- CreateTable
CREATE TABLE "Book" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "likes" INTEGER NOT NULL DEFAULT 0,
    "authorId" TEXT NOT NULL,
    "type" "BookType" NOT NULL DEFAULT 'NOVEL',
    "seriesId" TEXT,
    "genreId" TEXT NOT NULL,
    "subGenreId" TEXT NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'ONGOING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "coverImage" TEXT NOT NULL,

    CONSTRAINT "Book_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Book_title_key" ON "Book"("title");

-- AddForeignKey
ALTER TABLE "Book" ADD CONSTRAINT "Book_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Book" ADD CONSTRAINT "Book_seriesId_fkey" FOREIGN KEY ("seriesId") REFERENCES "Series"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Book" ADD CONSTRAINT "Book_genreId_fkey" FOREIGN KEY ("genreId") REFERENCES "Genre"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Book" ADD CONSTRAINT "Book_subGenreId_fkey" FOREIGN KEY ("subGenreId") REFERENCES "Genre"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Series" ADD CONSTRAINT "Series_forumId_fkey" FOREIGN KEY ("forumId") REFERENCES "Forum"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chapter" ADD CONSTRAINT "Chapter_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Likes" ADD CONSTRAINT "Likes_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Forum" ADD CONSTRAINT "Forum_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
