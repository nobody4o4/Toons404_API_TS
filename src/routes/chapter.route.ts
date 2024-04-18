import { Router } from "express";


import { adminMiddleware, authMiddleware, getUserMiddleware } from "../middleware/auth.middleware";
import { createChapter, deleteChapterById, getAllChaptersByBookId, getChapterById, getChapterByNumber, getNextChapter, updateChapterById } from "../controller/chapter.controller";
import uploadFile from "../middleware/uploadfile.middleware";

const chapterRouter: Router = Router();
const folder = "chapters";

chapterRouter.post("/:bookId/add", uploadFile(folder), authMiddleware, adminMiddleware, createChapter);
chapterRouter.patch("/update/:id",uploadFile(folder), authMiddleware, adminMiddleware, updateChapterById);
chapterRouter.delete("/delete/:id", authMiddleware, adminMiddleware, deleteChapterById);
chapterRouter.get("/next/:bookId/:currentChapterNumber",getUserMiddleware, getNextChapter);
chapterRouter.get("/perv/:bookId/:currentChapterNumber",getUserMiddleware, getNextChapter);
chapterRouter.get("/book/:bookId",getUserMiddleware, getAllChaptersByBookId);
chapterRouter.get("/:bookId/:number",getUserMiddleware, getChapterByNumber);
chapterRouter.get("/:id",getUserMiddleware, getChapterById);


export default chapterRouter;
 