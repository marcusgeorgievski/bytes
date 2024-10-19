import { Request, Response, NextFunction } from "express";

// Custom error class
export class AppError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}

// Error handling middlware
export function errorHandler(
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  res.status(statusCode).json({
    error: {
      message,
      status: statusCode,
    },
  });
}

// Error types
export const errorTypes: { [key: string]: number } = {
  "Bad request": 400,
  "Unauthorized request": 401,
  "Forbidden request": 403,
  "Not found": 404,
  "User already exists": 409,
  "Internal server error": 500,
};
