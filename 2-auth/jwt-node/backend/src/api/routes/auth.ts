import express from "express";
import { login, logout, register } from "../../controllers/auth-controller";

export const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.delete("/logout", logout);
