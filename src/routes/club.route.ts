import { Router } from "express";
import {  adminMiddleware, authMiddleware, subscriptionMiddleware } from "../middleware/auth.middleware";
import { createClub, getClubs } from "../controller/club.controller";


const clubRouter: Router = Router();

clubRouter.post("/add", authMiddleware,adminMiddleware, createClub);
clubRouter.get("/get", authMiddleware,subscriptionMiddleware,getClubs);

// clubRouter.post("/remove", authMiddleware,removeLike);


export default clubRouter;
