-- AlterTable
ALTER TABLE "Comments" ADD COLUMN     "comicChapterId" TEXT;

-- AlterTable
ALTER TABLE "Likes" ADD COLUMN     "comicChapterId" TEXT;

-- AddForeignKey
ALTER TABLE "Likes" ADD CONSTRAINT "Likes_comicChapterId_fkey" FOREIGN KEY ("comicChapterId") REFERENCES "ComicChapter"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comments" ADD CONSTRAINT "Comments_comicChapterId_fkey" FOREIGN KEY ("comicChapterId") REFERENCES "ComicChapter"("id") ON DELETE SET NULL ON UPDATE CASCADE;
