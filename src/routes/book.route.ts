import { Router } from "express";


import { adminMiddleware, authMiddleware, getUserMiddleware } from "../middleware/auth.middleware";
import { fullbookDetailById, createBook, deleteBookById, getAllBooks, getBookById, getBookByTitle, bookCard, updateBookById, fullbookDetail, getBookLikedByUser, searchBookByTitle } from "../controller/book.contorller";
import uploadFile from "../middleware/uploadfile.middleware";
import { validatorResult } from "../validator/index.validator";
import { errorHandler } from "../middleware/errors/errorHandler";

const bookRouter: Router = Router();
const folder = "books";

bookRouter.post("/add",uploadFile(folder), authMiddleware,errorHandler( adminMiddleware), createBook);
bookRouter.patch("/update/:id",uploadFile(folder), authMiddleware, adminMiddleware, updateBookById);
bookRouter.delete("/delete/:id", authMiddleware, adminMiddleware, deleteBookById);
bookRouter.get("/search/:title" , searchBookByTitle);
bookRouter.get("/all",getUserMiddleware, getAllBooks);
bookRouter.get("/fulldetail",authMiddleware, fullbookDetail);//sss
bookRouter.get("/reading-list",authMiddleware,getBookLikedByUser)
bookRouter.get("/bookcard",getUserMiddleware, bookCard);
// bookRouter.get("/:id/kjk", getBookById);
bookRouter.get("/bookpage/:id",getUserMiddleware, fullbookDetailById);
bookRouter.get("/:title",getUserMiddleware, getBookByTitle);

export default bookRouter;

