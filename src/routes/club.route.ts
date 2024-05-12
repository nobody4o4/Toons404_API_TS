import { Router } from "express";
import {  adminMiddleware, authMiddleware, subscriptionMiddleware } from "../middleware/auth.middleware";
import { createClub, getClubs } from "../controller/club.controller";
import { errorHandler } from "../middleware/errors/errorHandler";



const clubRouter: Router = Router();

clubRouter.post("/add", authMiddleware,adminMiddleware, createClub);
clubRouter.get("/get", authMiddleware, errorHandler(subscriptionMiddleware),getClubs);

// clubRouter.post("/remove", authMiddleware,removeLike);


export default clubRouter;
