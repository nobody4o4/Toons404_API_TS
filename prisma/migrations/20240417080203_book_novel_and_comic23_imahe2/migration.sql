-- AlterTable
ALTER TABLE "Chapter" ADD COLUMN     "type" "BookType" NOT NULL DEFAULT 'NOVEL';

-- CreateTable
CREATE TABLE "ComicImage" (
    "id" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "chapterId" TEXT NOT NULL,
    "number" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ComicImage_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ComicImage" ADD CONSTRAINT "ComicImage_chapterId_fkey" FOREIGN KEY ("chapterId") REFERENCES "Chapter"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
