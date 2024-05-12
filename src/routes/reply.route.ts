import { Router } from "express";
import {  authMiddleware, getUserMiddleware } from "../middleware/auth.middleware";
import { createCommentReply, deleteReply, getReplies } from "../controller/reply.controller";



const replyRouter: Router = Router();

replyRouter.get("/get/:chapterId/:type", getUserMiddleware, getReplies);
replyRouter.post("/add/:commentId", authMiddleware,createCommentReply);
replyRouter.post("/remove/:replyId", authMiddleware,deleteReply);


export default replyRouter;
