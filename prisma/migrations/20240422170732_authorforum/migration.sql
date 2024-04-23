/*
  Warnings:

  - You are about to drop the column `forumId` on the `Series` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Series" DROP CONSTRAINT "Series_forumId_fkey";

-- AlterTable
ALTER TABLE "Series" DROP COLUMN "forumId";
