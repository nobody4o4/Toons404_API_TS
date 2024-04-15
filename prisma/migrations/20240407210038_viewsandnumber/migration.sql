-- AlterTable
ALTER TABLE "Chapter" ALTER COLUMN "number" SET DEFAULT 0,
ALTER COLUMN "number" DROP DEFAULT;
DROP SEQUENCE "chapter_number_seq";
