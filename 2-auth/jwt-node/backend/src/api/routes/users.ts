import express from "express";
import { getUser } from "../../controllers/user-controller";
// import { authenticateToken } from "../../middleware/authMiddleware";
// import { getUser } from "../../controllers/userController";

export const userRouter = express.Router();

// All user routes use auth middleware
// userRouter.use(authenticateToken);

userRouter.get("/me", getUser);
