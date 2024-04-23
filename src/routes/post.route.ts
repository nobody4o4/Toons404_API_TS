import { Router } from "express";
import {  authMiddleware } from "../middleware/auth.middleware";
import { addLike, getLike, removeLike } from "../controller/like.controller";


const postRouter: Router = Router();

postRouter.get("/get", authMiddleware, getLike);
postRouter.post("/add", authMiddleware,addLike);
postRouter.post("/remove", authMiddleware,removeLike);


export default postRouter;
