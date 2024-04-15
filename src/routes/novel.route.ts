import { Router } from "express";


import { adminMiddleware, authMiddleware, getUserMiddleware } from "../middleware/auth.middleware";
import { fullnovelDetailById, createNovel, deleteNovelById, getAllNovels, getNovelById, getNovelByTitle, novelCard, updateNovelById, fullnovelDetail, getNovelLikedByUser } from "../controller/novel.contorller";
import uploadFile from "../middleware/uploadfile.middleware";

const novelRouter: Router = Router();
const folder = "novels";

novelRouter.post("/add",uploadFile(folder), authMiddleware, adminMiddleware, createNovel);
novelRouter.patch("/update/:id",uploadFile(folder), authMiddleware, adminMiddleware, updateNovelById);
novelRouter.delete("/delete/:id", authMiddleware, adminMiddleware, deleteNovelById);
novelRouter.get("/all",getUserMiddleware, getAllNovels);
novelRouter.get("/fulldetail",getUserMiddleware, fullnovelDetail);
novelRouter.get("/reading-list",authMiddleware,getNovelLikedByUser)
novelRouter.get("/novelcard",getUserMiddleware, novelCard);
// novelRouter.get("/:id/kjk", getNovelById);

novelRouter.get("/novelpage/:id",getUserMiddleware, fullnovelDetailById);
novelRouter.get("/:title",getUserMiddleware, getNovelByTitle);

export default novelRouter;

