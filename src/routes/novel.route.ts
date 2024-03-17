import { Router } from "express";


import { adminMiddleware, authMiddleware } from "../middleware/auth.middleware";
import { fullnovelDetailById, createNovel, deleteNovelById, getAllNovels, getNovelById, getNovelByTitle, novelCard, updateNovelById, fullnovelDetail } from "../controller/novel.contorller";
import uploadFile from "../middleware/uploadfile.middleware";

const novelRouter: Router = Router();
const folder = "novels";

novelRouter.post("/add",uploadFile(folder), authMiddleware, adminMiddleware, createNovel);
novelRouter.patch("/update/:id",uploadFile(folder), authMiddleware, adminMiddleware, updateNovelById);
novelRouter.delete("/delete/:id", authMiddleware, adminMiddleware, deleteNovelById);
novelRouter.get("/all", getAllNovels);
novelRouter.get("/fulldetail",fullnovelDetail);

novelRouter.get("/novelcard", novelCard);
// novelRouter.get("/:id/kjk", getNovelById);

novelRouter.get("/novelpage/:id", fullnovelDetailById);
novelRouter.get("/:title", getNovelByTitle);



export default novelRouter;
