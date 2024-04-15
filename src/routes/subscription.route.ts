import { Router } from "express";
import {  authMiddleware } from "../middleware/auth.middleware";
import { createSubscription, getSubscriptionByUserId, updateSubscriptionAfterPayment } from "../controller/subscription.controller";
import { handleKhaltiCallback } from "../middleware/khalti.middleware";


const subscriptionRouter: Router = Router();

subscriptionRouter.post("/add", authMiddleware, createSubscription);
subscriptionRouter.get("/get", authMiddleware, getSubscriptionByUserId);
subscriptionRouter.post("/callback",authMiddleware, handleKhaltiCallback, updateSubscriptionAfterPayment);

export default subscriptionRouter;
