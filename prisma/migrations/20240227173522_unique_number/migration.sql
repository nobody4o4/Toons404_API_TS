/*
  Warnings:

  - A unique constraint covering the columns `[number]` on the table `Chapter` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
CREATE SEQUENCE chapter_number_seq;
ALTER TABLE "Chapter" ALTER COLUMN "number" SET DEFAULT nextval('chapter_number_seq');
ALTER SEQUENCE chapter_number_seq OWNED BY "Chapter"."number";

-- CreateIndex
CREATE UNIQUE INDEX "Chapter_number_key" ON "Chapter"("number");
