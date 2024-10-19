import dotenv from "dotenv";
import { startServer } from "./app";

dotenv.config();

process.on("uncaughtException", (err, origin) => {
  console.log({ err, origin }, "uncaughtException");
  throw err;
});

process.on("unhandledRejection", (reason, promise) => {
  console.log({ reason, promise }, "unhandledRejection");
  throw reason;
});

startServer();
