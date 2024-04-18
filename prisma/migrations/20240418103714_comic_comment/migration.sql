-- DropForeignKey
ALTER TABLE "Comments" DROP CONSTRAINT "Comments_chapterId_fkey";

-- AlterTable
ALTER TABLE "Comments" ALTER COLUMN "chapterId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Comments" ADD CONSTRAINT "Comments_chapterId_fkey" FOREIGN KEY ("chapterId") REFERENCES "Chapter"("id") ON DELETE SET NULL ON UPDATE CASCADE;
