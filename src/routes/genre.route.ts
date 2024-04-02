import { Router } from "express";

import {addGenre, deleteGenre, getAllGenres, getGenreById, getGenreName, updateGenreById} from "../controller/genre.controller";
import { adminMiddleware, authMiddleware } from "../middleware/auth.middleware";
import uploadFile from "../middleware/uploadfile.middleware";

const genreRouter: Router = Router();
const folder = "genre";

genreRouter.post("/add",uploadFile(folder), authMiddleware, adminMiddleware, addGenre);
genreRouter.patch("/update/:id",uploadFile(folder), authMiddleware, adminMiddleware, updateGenreById);
genreRouter.delete("/delete/:id", authMiddleware, adminMiddleware, deleteGenre);
genreRouter.get("/all", getAllGenres);
genreRouter.get("/select", getGenreName);
genreRouter.get("/:id", getGenreById);


export default genreRouter;
