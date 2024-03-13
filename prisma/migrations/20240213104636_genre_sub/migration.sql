/*
  Warnings:

  - You are about to drop the `_GenreNovels` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_SubGenreNovels` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `genreId` to the `Novel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subGenreId` to the `Novel` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_GenreNovels" DROP CONSTRAINT "_GenreNovels_A_fkey";

-- DropForeignKey
ALTER TABLE "_GenreNovels" DROP CONSTRAINT "_GenreNovels_B_fkey";

-- DropForeignKey
ALTER TABLE "_SubGenreNovels" DROP CONSTRAINT "_SubGenreNovels_A_fkey";

-- DropForeignKey
ALTER TABLE "_SubGenreNovels" DROP CONSTRAINT "_SubGenreNovels_B_fkey";

-- AlterTable
ALTER TABLE "Novel" ADD COLUMN     "genreId" TEXT NOT NULL,
ADD COLUMN     "subGenreId" TEXT NOT NULL;

-- DropTable
DROP TABLE "_GenreNovels";

-- DropTable
DROP TABLE "_SubGenreNovels";

-- AddForeignKey
ALTER TABLE "Novel" ADD CONSTRAINT "Novel_genreId_fkey" FOREIGN KEY ("genreId") REFERENCES "Genre"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Novel" ADD CONSTRAINT "Novel_subGenreId_fkey" FOREIGN KEY ("subGenreId") REFERENCES "Genre"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
