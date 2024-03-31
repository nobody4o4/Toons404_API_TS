import { Router } from "express";
import { getStats } from "../controller/dashboard.controller";

const dashboardRouter: Router = Router();
const folder = "chapters";


dashboardRouter.get("/stats",getStats );


export default dashboardRouter;
