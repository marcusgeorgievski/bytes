import { Request, Response, NextFunction } from "express";
import { AppError, errorTypes } from "../lib/errors";
import { AuthRequest } from "../lib/types";
import pool from "../db/db";

export async function getUser(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  const userId = req.user?.userId;

  try {
    if (!userId) {
      throw new AppError("Not authenticated", 401);
    }

    // Fetch user
    const result = await pool.query(
      "SELECT id, username, email FROM users WHERE id = $1",
      [userId]
    );

    if (result.rows.length === 0) {
      throw new AppError("User not found", 404);
    }

    const user = result.rows[0];

    res.status(201).json({
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        // Add any other non-sensitive fields you want to include
      },
    });
  } catch (error) {
    if (error instanceof AppError) {
      return next(error);
    }

    if (error instanceof Error) {
      const statusCode = errorTypes[error.message] || 500;
      return next(new AppError(error.message, statusCode));
    }

    next(new AppError("An error occurred while fetching the user", 500));
  }
}
