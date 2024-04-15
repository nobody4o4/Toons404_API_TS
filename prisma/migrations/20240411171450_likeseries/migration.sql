-- AlterTable
ALTER TABLE "Likes" ADD COLUMN     "seriesId" TEXT;

-- AddForeignKey
ALTER TABLE "Likes" ADD CONSTRAINT "Likes_seriesId_fkey" FOREIGN KEY ("seriesId") REFERENCES "Series"("id") ON DELETE SET NULL ON UPDATE CASCADE;
