import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import apiRouter from "./api";
import { AppError, errorHandler } from "./lib/errors";

const app = express();

app.use(express.json());
app.use(cookieParser());

// Allow frontend to make requests to this server
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// Health check
app.get("/health", (req, res) => {
  res.send("Healthy!");
});

// Mount all api routes
app.use("/api", apiRouter);

// Handle 404 errors
app.use((req, res, next) => {
  next(new AppError("Not found", 404));
});

// Error handling middleware
app.use(errorHandler);

export const startServer = () => {
  const port = process.env.PORT || 8080;

  app.listen(port, () => {
    console.log(`Express is listening at http://localhost:${port}`);
  });
};
