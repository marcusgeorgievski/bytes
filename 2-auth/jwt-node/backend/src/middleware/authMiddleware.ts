import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AuthRequest } from "../lib/types";
import { AppError } from "../lib/errors";

export const authenticateToken = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies?.token;

  if (!token) {
    throw new AppError("No token provided", 401);
  }

  jwt.verify(token, process.env.JWT_SECRET, (err: any, decodedUser: any) => {
    if (err) {
      throw new AppError("Invalid or expired token", 401);
    }

    req.user = { userId: decodedUser.sub };

    next();
  });
};
