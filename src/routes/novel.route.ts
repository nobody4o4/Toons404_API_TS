import { Router } from "express";


import { adminMiddleware, authMiddleware } from "../middleware/auth.middleware";
import { fullnovelDetailById, createNovel, deleteNovelById, getAllNovels, getNovelById, getNovelByTitle, novelCard, updateNovelById } from "../controller/novel.contorller";

const novelRouter: Router = Router();

novelRouter.post("/add", authMiddleware, adminMiddleware, createNovel);
novelRouter.patch("/update/:id", authMiddleware, adminMiddleware, updateNovelById);
novelRouter.delete("/delete/:id", authMiddleware, adminMiddleware, deleteNovelById);
novelRouter.get("/all", getAllNovels);
novelRouter.get("/novelcard", novelCard);
// novelRouter.get("/:id/kjk", getNovelById);

novelRouter.get("/novelpage/:id", fullnovelDetailById);
novelRouter.get("/:title", getNovelByTitle);



export default novelRouter;
