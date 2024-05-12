import { Router } from "express";
import {  authMiddleware, subscriptionMiddleware } from "../middleware/auth.middleware";
import { createPost, getAllPost, getFollowingPost, getPopularPost, getPostById, getPostByUserId, getPosts } from "../controller/post.controller";


const postRouter: Router = Router();


postRouter.get("/all", authMiddleware, getAllPost);
postRouter.get("/user/:id", authMiddleware, getPostByUserId);
postRouter.get("/popular", authMiddleware, getPopularPost);
postRouter.get("/following", authMiddleware, getFollowingPost);
postRouter.post("/add", authMiddleware,createPost);
postRouter.get("/:id", authMiddleware, getPostById);

// postRouter.post("/remove", authMiddleware,removeLike);


export default postRouter;
