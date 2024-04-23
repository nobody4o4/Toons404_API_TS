/*
  Warnings:

  - You are about to drop the column `postId` on the `PostCommentReply` table. All the data in the column will be lost.
  - Added the required column `postCommentId` to the `PostCommentReply` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "PostCommentReply" DROP CONSTRAINT "PostCommentReply_postId_fkey";

-- AlterTable
ALTER TABLE "PostCommentReply" DROP COLUMN "postId",
ADD COLUMN     "postCommentId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "PostCommentReply" ADD CONSTRAINT "PostCommentReply_postCommentId_fkey" FOREIGN KEY ("postCommentId") REFERENCES "PostComment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
