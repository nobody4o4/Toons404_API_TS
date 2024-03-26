import { Router, Request, Response } from "express";
import { deleteUserById, getAllUsers, getRoleById, getUserById, login, me, register, updateUserById } from "../controller/user.controller";
import { validatorResult } from "../validator/index.validator";
import RegisterValidator from "../validator/user.validator";
import  {authMiddleware}  from '../middleware/auth.middleware';
import uploadFile from "../middleware/uploadfile.middleware";
import { errorHandler } from "../errors/errorHandler";
// import { uploadImg } from "../middleware/uploadFlie.ts/index.ts";

const userRouter: Router = Router();
const folder = "user";

userRouter.post("/register",uploadFile(folder), validatorResult(RegisterValidator), errorHandler(register) );
userRouter.post("/login", login);
userRouter.get("/me",authMiddleware, me);
userRouter.get("/role",authMiddleware, getUserById);

userRouter.patch("/update/:id", authMiddleware, updateUserById);
userRouter.delete("/delete/:id", authMiddleware, deleteUserById);
userRouter.get("/all", getAllUsers);
userRouter.get("/hehe",authMiddleware, getRoleById);
userRouter.get("/:id", getUserById);

export default userRouter;
