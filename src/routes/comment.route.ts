import { Router } from "express";
import {  authMiddleware, getUserMiddleware } from "../middleware/auth.middleware";
import { addComment, getComment, removeComment } from "../controller/comment.controller";


const commentRouter: Router = Router();

commentRouter.get("/get/:chapterId", getUserMiddleware, getComment);
commentRouter.post("/add/:chapterId", authMiddleware,addComment);
commentRouter.post("/remove/:commentId", authMiddleware,removeComment);


export default commentRouter;
