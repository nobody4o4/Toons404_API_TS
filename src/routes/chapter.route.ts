import { Router } from "express";


import { adminMiddleware, authMiddleware } from "../middleware/auth.middleware";
import { createChapter, deleteChapterById, getAllChaptersByNovelId, getChapterById, getChapterByNumber, getNextChapter, updateChapterById } from "../controller/chapter.controller";

const chapterRouter: Router = Router();

chapterRouter.post("/add", authMiddleware, adminMiddleware, createChapter);
chapterRouter.patch("/update/:id", authMiddleware, adminMiddleware, updateChapterById);
chapterRouter.delete("/delete/:id", authMiddleware, adminMiddleware, deleteChapterById);
chapterRouter.get("/:novelId/:currentChapterNumber/next", getNextChapter);
chapterRouter.get("/:novelId/:currentChapterNumber/prev", getNextChapter);
chapterRouter.get("/novel/:novelId", getAllChaptersByNovelId);
chapterRouter.get("/:novelId/:number", getChapterByNumber);


export default chapterRouter;
