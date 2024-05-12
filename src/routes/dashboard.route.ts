import { Router } from "express";
import { getStats, getUserRegistedPerMonth } from "../controller/dashboard.controller";

const dashboardRouter: Router = Router();
const folder = "chapters";


dashboardRouter.get("/stats",getStats );
dashboardRouter.get("/registred-count",getUserRegistedPerMonth );


export default dashboardRouter;
