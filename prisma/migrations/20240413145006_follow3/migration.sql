/*
  Warnings:

  - You are about to drop the column `post_CommentsId` on the `Likes` table. All the data in the column will be lost.
  - You are about to drop the column `Visibility` on the `Novel` table. All the data in the column will be lost.
  - You are about to drop the `Post_Comments` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Post_Likes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Post_comment_reply` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `forum` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `thumbnail` on table `Chapter` required. This step will fail if there are existing NULL values in that column.
  - Made the column `coverImage` on table `Novel` required. This step will fail if there are existing NULL values in that column.
  - Made the column `coverImage` on table `Series` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Likes" DROP CONSTRAINT "Likes_post_CommentsId_fkey";

-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_forumId_fkey";

-- DropForeignKey
ALTER TABLE "Post_Comments" DROP CONSTRAINT "Post_Comments_postId_fkey";

-- DropForeignKey
ALTER TABLE "Post_Comments" DROP CONSTRAINT "Post_Comments_userId_fkey";

-- DropForeignKey
ALTER TABLE "Post_Likes" DROP CONSTRAINT "Post_Likes_postId_fkey";

-- DropForeignKey
ALTER TABLE "Post_Likes" DROP CONSTRAINT "Post_Likes_userId_fkey";

-- DropForeignKey
ALTER TABLE "Post_comment_reply" DROP CONSTRAINT "Post_comment_reply_postId_fkey";

-- DropForeignKey
ALTER TABLE "Post_comment_reply" DROP CONSTRAINT "Post_comment_reply_userId_fkey";

-- DropForeignKey
ALTER TABLE "forum" DROP CONSTRAINT "forum_seriesId_fkey";

-- AlterTable
ALTER TABLE "Chapter" ALTER COLUMN "thumbnail" SET NOT NULL;

-- AlterTable
ALTER TABLE "Likes" DROP COLUMN "post_CommentsId",
ADD COLUMN     "postCommentId" TEXT;

-- AlterTable
ALTER TABLE "Novel" DROP COLUMN "Visibility",
ALTER COLUMN "coverImage" SET NOT NULL;

-- AlterTable
ALTER TABLE "Series" ALTER COLUMN "coverImage" SET NOT NULL;

-- DropTable
DROP TABLE "Post_Comments";

-- DropTable
DROP TABLE "Post_Likes";

-- DropTable
DROP TABLE "Post_comment_reply";

-- DropTable
DROP TABLE "forum";

-- DropEnum
DROP TYPE "Visibility";

-- CreateTable
CREATE TABLE "Forum" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "seriesId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Forum_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PostComment" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "postId" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PostComment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PostLike" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "postId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PostLike_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PostCommentReply" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "postId" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PostCommentReply_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Forum_seriesId_key" ON "Forum"("seriesId");

-- AddForeignKey
ALTER TABLE "Likes" ADD CONSTRAINT "Likes_postCommentId_fkey" FOREIGN KEY ("postCommentId") REFERENCES "PostComment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Forum" ADD CONSTRAINT "Forum_seriesId_fkey" FOREIGN KEY ("seriesId") REFERENCES "Series"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_forumId_fkey" FOREIGN KEY ("forumId") REFERENCES "Forum"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostComment" ADD CONSTRAINT "PostComment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostComment" ADD CONSTRAINT "PostComment_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostLike" ADD CONSTRAINT "PostLike_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostLike" ADD CONSTRAINT "PostLike_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostCommentReply" ADD CONSTRAINT "PostCommentReply_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostCommentReply" ADD CONSTRAINT "PostCommentReply_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
