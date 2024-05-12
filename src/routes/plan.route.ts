import { Router } from "express";
import {  authMiddleware } from "../middleware/auth.middleware";
import { getPlans } from "../controller/plan.controller";



const planRouter: Router = Router();

planRouter.get("/all", authMiddleware, getPlans);



export default planRouter;
