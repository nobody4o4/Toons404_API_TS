import { Router } from "express";


import { adminMiddleware, authMiddleware, getUserMiddleware } from "../middleware/auth.middleware";
import { createSeries, deleteSeriesById, getAllSeries, getSeriesById, getSeriesDetails, getSeriesName, seriesCard, updateSeriesById } from "../controller/series.controller";
import uploadFile from "../middleware/uploadfile.middleware";


const seriesRouter: Router = Router();
const folder = "series";

seriesRouter.post("/add",uploadFile(folder), authMiddleware, adminMiddleware, createSeries);
seriesRouter.patch("/update/:id",uploadFile(folder), authMiddleware, adminMiddleware, updateSeriesById);
seriesRouter.delete("/delete/:id", authMiddleware, adminMiddleware, deleteSeriesById);
seriesRouter.get("/all",getUserMiddleware, getAllSeries);
seriesRouter.get("/seriescard",getUserMiddleware, seriesCard);
seriesRouter.get("/select",authMiddleware,adminMiddleware, getSeriesName);
seriesRouter.get("/fulldetail/:id",getUserMiddleware, getSeriesDetails);
seriesRouter.get("/:id",getUserMiddleware, getSeriesById);

export default seriesRouter;
