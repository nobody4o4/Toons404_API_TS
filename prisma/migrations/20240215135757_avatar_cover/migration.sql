-- AlterTable
ALTER TABLE "Chapter" ADD COLUMN     "thumbnail" TEXT;

-- AlterTable
ALTER TABLE "Genre" ADD COLUMN     "coverImage" TEXT;

-- AlterTable
ALTER TABLE "Novel" ADD COLUMN     "coverImage" TEXT;

-- AlterTable
ALTER TABLE "Series" ADD COLUMN     "coverImage" TEXT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "Avatar" TEXT;
