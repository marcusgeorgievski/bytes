import { Request, Response, NextFunction } from "express";
import { AppError, errorTypes } from "../lib/errors";
import pool from "../db/db";

export async function getFeaturedPosts(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const result = await pool.query(`
      SELECT 
          p.id AS id,
          p.title AS title, 
          p.description, 
          u.username,
          COUNT(l.id) AS likes,
          COUNT(d.id) AS dislikes
      FROM posts p
      JOIN users u ON p.user_id = u.id
      LEFT JOIN likes l ON p.id = l.post_id
      LEFT JOIN dislikes d ON p.id = d.post_id
      GROUP BY p.id, p.title, p.description, u.username
      ORDER BY likes DESC
      LIMIT 3`);

    res.status(200).json(result.rows);
  } catch (error) {
    if (error instanceof AppError) {
      return next(error);
    }

    if (error instanceof Error) {
      const statusCode = errorTypes[error.message] || 500;
      return next(new AppError(error.message, statusCode));
    }

    next(new AppError("An error occurred while fetching features posts", 500));
  }
}

export async function getSinglePost(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const postId = req.params.id;

  try {
    const result = await pool.query(
      `
        SELECT 
            p.id AS id,
            p.title AS title, 
            p.description, 
            u.username,
            COUNT(l.id) AS likes,
            COUNT(d.id) AS dislikes
        FROM posts p
        JOIN users u ON p.user_id = u.id
        LEFT JOIN likes l ON p.id = l.post_id
        LEFT JOIN dislikes d ON p.id = d.post_id
        WHERE p.id = $1
        GROUP BY p.id, p.title, p.description, u.username`,
      [postId]
    );

    if (result.rows.length === 0) {
      throw new AppError(`No post with id ${postId} found`, 404);
    }

    res.status(201).json(result.rows);
  } catch (error) {
    if (error instanceof AppError) {
      return next(error);
    }

    if (error instanceof Error) {
      const statusCode = errorTypes[error.message] || 500;
      return next(new AppError(error.message, statusCode));
    }

    next(new AppError("An error occurred while logging out the user", 500));
  }
}
