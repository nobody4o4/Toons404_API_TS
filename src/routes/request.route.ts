import { Router } from "express";
import {  adminMiddleware, authMiddleware } from "../middleware/auth.middleware";
import { acceptAuthorRequest, getAuthorRequests, rejectAuthorRequest, requestAuthor } from "../controller/request.controller";


const requestRouter: Router = Router();

requestRouter.post("/", authMiddleware,requestAuthor );
requestRouter.get("/all", authMiddleware, adminMiddleware, getAuthorRequests);
requestRouter.post("/accept/:id", authMiddleware,adminMiddleware,acceptAuthorRequest);
requestRouter.post("/reject/:id", authMiddleware,adminMiddleware, adminMiddleware, rejectAuthorRequest);

export default requestRouter;
