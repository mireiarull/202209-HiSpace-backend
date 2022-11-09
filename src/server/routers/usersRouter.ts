import "../../loadEnvirontment.js";
import express from "express";
import { loginUser, registerUser } from "../controllers/userControllers.js";
import app from "../app.js";

// eslint-disable-next-line new-cap
const userRouter = express.Router();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

userRouter.post("/login", loginUser);
userRouter.post("/register", registerUser);

export default userRouter;
