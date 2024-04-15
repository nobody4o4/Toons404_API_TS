import { Router } from "express";
import {  authMiddleware } from "../middleware/auth.middleware";
import { follow, unfollow } from "../controller/follow.controller";


const followRouter: Router = Router();

// followRouter.get("/get", authMiddleware, getLike);
followRouter.post("/follow/:userId", authMiddleware,follow);
followRouter.post("/unfollow/:userId", authMiddleware,unfollow);


export default followRouter;
