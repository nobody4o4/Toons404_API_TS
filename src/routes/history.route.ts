import { Router } from "express";

import {addGenre, deleteGenre, getAllGenres, getGenreById, getGenreName, updateGenreById} from "../controller/genre.controller";
import { adminMiddleware, authMiddleware } from "../middleware/auth.middleware";
import uploadFile from "../middleware/uploadfile.middleware";
import { getUniqueBookHistory } from "../controller/history.controller";

const historyRouter: Router = Router();
const folder = "genre";

historyRouter.get("/my-history", authMiddleware, getUniqueBookHistory);
// historyRouter.get("/select", getGenreName);
// historyRouter.get("/:id", getGenreById);


export default historyRouter;
