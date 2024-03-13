import { Router } from "express";

import {addGenre, deleteGenre, getAllGenres, getGenreById, updateGenre} from "../controller/genre.controller";
import { adminMiddleware, authMiddleware } from "../middleware/auth.middleware";
import { me } from "../controller/user.controller";
import uploadFile from "../middleware/uploadfile.middleware";

const genreRouter: Router = Router();
const folder = "genre";

genreRouter.post("/add",uploadFile(folder), authMiddleware, adminMiddleware, addGenre);
genreRouter.patch("/update/:id",uploadFile(folder), authMiddleware, adminMiddleware, updateGenre);
genreRouter.delete("/delete/:id", authMiddleware, adminMiddleware, deleteGenre);
genreRouter.get("/all", getAllGenres);
genreRouter.get("/:id", getGenreById);


export default genreRouter;
