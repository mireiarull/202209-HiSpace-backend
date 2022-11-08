import express from "express";
import morgan from "morgan";
import { generalError, notFoundError } from "./middlewares/error.js";
import robotsRouter from "./routers/robotsRouter.js";
import cors from "cors";
import userRouter from "./routers/usersRouter.js";
import auth from "./middlewares/auth.js";

const app = express();

app.use(cors());

app.disable("x-powered-by");

app.use(morgan("dev"));

app.use(express.json());

app.use("/users", userRouter);
app.use("/robots", auth, robotsRouter);

app.use(notFoundError);
app.use(generalError);

export default app;
