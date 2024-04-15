import { Router } from "express";
import {  authMiddleware } from "../middleware/auth.middleware";
import { addLike, getLike, removeLike } from "../controller/like.controller";


const likesRouter: Router = Router();

likesRouter.get("/get", authMiddleware, getLike);
likesRouter.post("/add", authMiddleware,addLike);
likesRouter.post("/remove", authMiddleware,removeLike);


export default likesRouter;
