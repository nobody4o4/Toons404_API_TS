import { Router, Request, Response } from "express";
import { deleteUserById, getAllUsers, getCurrentUserProfile, getRoleById, getUserById, getUserProfile, login, me, register, updateUserById } from "../controller/user.controller";
import { validatorResult } from "../validator/index.validator";
import RegisterValidator from "../validator/user.validator";
import  {adminMiddleware, authMiddleware}  from '../middleware/auth.middleware';
import uploadFile from "../middleware/uploadfile.middleware";
import { errorHandler } from "../middleware/errors/errorHandler";

const userRouter: Router = Router();
const folder = "user";

userRouter.post("/register",uploadFile(folder), validatorResult(RegisterValidator), errorHandler(register) );
userRouter.post("/login", login);
userRouter.get("/me",authMiddleware, me);
userRouter.get("/my-profile",authMiddleware, getCurrentUserProfile);
userRouter.get("/profile/:username",authMiddleware, getUserProfile);
userRouter.patch("/update-profile",uploadFile(folder), authMiddleware, updateUserById);
userRouter.delete("/delete/:id", authMiddleware, deleteUserById);
userRouter.get("/all",  authMiddleware,adminMiddleware, getAllUsers);
userRouter.get("/role",authMiddleware, getRoleById);
userRouter.get("/:id", authMiddleware,adminMiddleware, getUserById);

export default userRouter;
