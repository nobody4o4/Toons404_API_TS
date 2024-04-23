import { Router } from "express";
import {  authMiddleware } from "../middleware/auth.middleware";
import { addLike, getLike, removeLike } from "../controller/like.controller";


const forumRouter: Router = Router();

forumRouter.get("/get", authMiddleware, getLike);
forumRouter.post("/add", authMiddleware,addLike);
forumRouter.post("/remove", authMiddleware,removeLike);


export default forumRouter;
