import { Router } from "express";


import { adminMiddleware, authMiddleware, getUserMiddleware } from "../middleware/auth.middleware";
import { createChapter, deleteChapterById, getAllChaptersByNovelId, getChapterById, getChapterByNumber, getNextChapter, updateChapterById } from "../controller/chapter.controller";
import uploadFile from "../middleware/uploadfile.middleware";

const chapterRouter: Router = Router();
const folder = "chapters";

chapterRouter.post("/:novelId/add", uploadFile(folder), authMiddleware, adminMiddleware, createChapter);
chapterRouter.patch("/update/:id",uploadFile(folder), authMiddleware, adminMiddleware, updateChapterById);
chapterRouter.delete("/delete/:id", authMiddleware, adminMiddleware, deleteChapterById);
chapterRouter.get("/next/:novelId/:currentChapterNumber",getUserMiddleware, getNextChapter);
chapterRouter.get("/perv/:novelId/:currentChapterNumber",getUserMiddleware, getNextChapter);
chapterRouter.get("/novel/:novelId",getUserMiddleware, getAllChaptersByNovelId);
chapterRouter.get("/:novelId/:number",getUserMiddleware, getChapterByNumber);
chapterRouter.get("/:id",getUserMiddleware, getChapterById);


export default chapterRouter;
 