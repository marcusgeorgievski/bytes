import express from "express";
import {
  getFeaturedPosts,
  getSinglePost,
} from "../../controllers/post-controller";
import { authenticateToken } from "../../middleware/authMiddleware";

export const postsRouter = express.Router();

postsRouter.get("/featured", getFeaturedPosts);
postsRouter.get("/:id", authenticateToken, getSinglePost);
