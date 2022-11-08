import "../../loadEnvirontment.js";
import type { NextFunction, Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import type { Credentials, UserTokenPayload } from "../../types.js";
import User from "../../database/models/User.js";
import CustomError from "../../CustomError/CustomError.js";
import environment from "../../loadEnvirontment.js";

const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  const { username, password } = req.body as Credentials;

  const user = await User.findOne({ username });

  if (!user) {
    const error = new CustomError(
      "Username not found",
      401,
      "Wrong credentials"
    );
    next(error);
    return;
  }

  if (!(await bcrypt.compare(password, user.password))) {
    const error = new CustomError(
      "Password is incorrect",
      401,
      "Wrong credentials"
    );
    next(error);
    return;
  }

  const tokenPaylod: UserTokenPayload = {
    id: user._id.toString(),
    username,
  };

  const token = jwt.sign(tokenPaylod, environment.jwtSecret);

  res.status(200).json({ accessToken: token });
};

export default loginUser;
