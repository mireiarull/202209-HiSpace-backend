import "../../loadEnvirontment.js";
import express from "express";
import loginUser from "../controllers/userControllers.js";

// eslint-disable-next-line new-cap
const userRouter = express.Router();

userRouter.post("/login", loginUser);

export default userRouter;
