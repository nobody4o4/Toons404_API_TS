import { Router } from "express";
import {  authMiddleware } from "../middleware/auth.middleware";
import { createSubscription, updateSubscriptionAfterPayment } from "../controller/subscription.controller";
import { handleKhaltiCallback } from "../middleware/khalti.middleware";


const subscriptionRouter: Router = Router();

subscriptionRouter.post("/add", authMiddleware, createSubscription);
subscriptionRouter.post("/callback",authMiddleware, handleKhaltiCallback, updateSubscriptionAfterPayment);

export default subscriptionRouter;
