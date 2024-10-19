import { Router } from "express";
import { authRouter } from "./routes/auth";
import { postsRouter } from "./routes/posts";
import { userRouter } from "./routes/users";

const apiRouter = Router();

apiRouter.use("/auth", authRouter);
apiRouter.use("/posts", postsRouter);
apiRouter.use("/users", userRouter);

export default apiRouter;
