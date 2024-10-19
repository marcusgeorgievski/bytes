import { Request, Response, NextFunction } from "express";
import { AppError, errorTypes } from "../lib/errors";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import pool from "../db/db";

export async function register(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      throw new AppError("All fields are required", 400);
    }

    if (password.length < 8) {
      throw new AppError("Password must be at least 4 characters long", 400);
    }

    // Check if user exists
    const result = await pool.query(
      `SELECT id FROM users WHERE username = $1 OR email = $2`,
      [username, email]
    );

    // Error: user already exists
    if (result.rows.length > 0) {
      res.status(409).json({ error: "Username or email already exists" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds
    const normalizedEmail = email.toLowerCase();

    // Store user in db
    await pool.query(
      `INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id`,
      [username, normalizedEmail, hashedPassword]
    );

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    if (error instanceof AppError) {
      return next(error);
    }

    if (error.code === "23505") {
      return next(new AppError(error.message, 409));
    }

    next(new AppError("An error occurred while registering the user", 500));
  }
}

export async function login(req: Request, res: Response, next: NextFunction) {
  const { email, password } = req.body;

  try {
    // Validate the request
    if (!email || !password) {
      throw new AppError("All fields are required", 400);
    }

    // Normalize input
    const normalizedEmail = email.toLowerCase();

    // Retrieve user
    const result = await pool.query(
      `SELECT id, username, email, password FROM users WHERE email = $1`,
      [normalizedEmail]
    );

    const user = result.rows[0];

    // Check if user exists
    if (!user) {
      throw new AppError("Invalid credentials", 401);
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new AppError("Invalid credentials", 401);
    }

    // Generate JWT
    const token = jwt.sign(
      {
        sub: user.id.toString(),
        iat: Math.floor(Date.now() / 1000),
      },
      process.env.JWT_SECRET as string,
      { expiresIn: "1h" }
    );

    // Set token in HTTP-only cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax", // Use "lax" in development if needed
      maxAge: 60 * 60 * 1000, // 1 hour in milliseconds
    });

    res.status(201).json({ message: "User logged in successfully" });
  } catch (error) {
    if (error instanceof AppError) {
      return next(error);
    }

    if (error instanceof Error) {
      const statusCode = errorTypes[error.message] || 500;
      return next(new AppError(error.message, statusCode));
    }

    next(new AppError("An error occurred while logging in the user", 500));
  }
}

export async function logout(req: Request, res: Response, next: NextFunction) {
  try {
    const token = req.cookies.token;

    if (!token) {
      throw new AppError("No token found", 400);
    }

    res.clearCookie("token");
    res.status(201).json({ message: "User logged out successfully" });
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
