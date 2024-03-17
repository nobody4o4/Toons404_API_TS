import { Router } from "express";


import { adminMiddleware, authMiddleware } from "../middleware/auth.middleware";
import { createSeries, deleteSeriesById, getAllSeries, getSeriesById, getSeriesName, updateSeriesById } from "../controller/series.controller";
import uploadFile from "../middleware/uploadfile.middleware";


const seriesRouter: Router = Router();
const folder = "series";

seriesRouter.post("/add",uploadFile(folder), authMiddleware, adminMiddleware, createSeries);
seriesRouter.patch("/update/:id", authMiddleware, adminMiddleware, updateSeriesById);
seriesRouter.delete("/delete/:id", authMiddleware, adminMiddleware, deleteSeriesById);
seriesRouter.get("/all", getAllSeries);
seriesRouter.get("/select", getSeriesName);
seriesRouter.get("/:id", getSeriesById);


export default seriesRouter;
