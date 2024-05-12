import { Router } from "express";
import {  authMiddleware, getUserMiddleware } from "../middleware/auth.middleware";
import { addComment, getComment, removeComment } from "../controller/comment.controller";


const commentRouter: Router = Router();

commentRouter.get("/get/:itemId/:type", getUserMiddleware, getComment);
commentRouter.post("/add/:commentedItemId", authMiddleware,addComment);
commentRouter.post("/remove/:commentId", authMiddleware,removeComment);


export default commentRouter;
