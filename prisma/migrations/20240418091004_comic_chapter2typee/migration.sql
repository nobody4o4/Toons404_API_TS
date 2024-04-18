/*
  Warnings:

  - The values [SERIES] on the enum `BookType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "BookType_new" AS ENUM ('NOVEL', 'COMIC');
ALTER TABLE "Book" ALTER COLUMN "type" DROP DEFAULT;
ALTER TABLE "Book" ALTER COLUMN "type" TYPE "BookType_new" USING ("type"::text::"BookType_new");
ALTER TYPE "BookType" RENAME TO "BookType_old";
ALTER TYPE "BookType_new" RENAME TO "BookType";
DROP TYPE "BookType_old";
ALTER TABLE "Book" ALTER COLUMN "type" SET DEFAULT 'NOVEL';
COMMIT;
