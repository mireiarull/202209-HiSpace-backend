import express from "express";
import morgan from "morgan";
import { generalError, notFoundError } from "./middlewares/error.js";
import robotsRouter from "./routers/robotsRouter.js";
import cors from "cors";
import userRouter from "./routers/usersRouter.js";

const app = express();

// Const corsOptions: CorsOptions = {
//   origin: "*",
//   optionsSuccessStatus: 200,
// };

app.use(cors());

app.disable("x-powered-by");

app.use(morgan("dev"));

app.use(express.json());

app.use("/users", userRouter);
app.use("/robots", robotsRouter);

app.use(notFoundError);
app.use(generalError);

export default app;
