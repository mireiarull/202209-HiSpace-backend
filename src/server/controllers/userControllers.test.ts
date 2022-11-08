import type { NextFunction, Request, Response } from "express";
import User from "../../database/models/User";
import type { Credentials } from "../../types";
import { loginUser } from "./userControllers";
import jwt from "jsonwebtoken";
import environment from "../../loadEnvirontment";
import CustomError from "../../CustomError/CustomError";
import bcrypt from "bcryptjs";

beforeEach(() => {
  jest.clearAllMocks();
});

const { jwtSecret } = environment;

const token = jwt.sign({}, jwtSecret);

const res: Partial<Response> = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};

const next = jest.fn();

describe("Given a loginUser controller", () => {
  const loginBody: Credentials = {
    username: "paco",
    password: "paco123",
  };

  const req: Partial<Request> = {
    body: loginBody,
  };

  describe("When it receives a request with an invalid username", () => {
    test("Then it should invoke the next function with a username error", async () => {
      User.findOne = jest.fn().mockResolvedValueOnce(null);
      const usernameError = new CustomError(
        "Username not found",
        401,
        "Wrong credentials"
      );

      await loginUser(req as Request, res as Response, next as NextFunction);

      expect(next).toBeCalledWith(usernameError);
    });
  });

  describe("When it receives a valid username and the wrong password", () => {
    test("Then it should invoke the next function with a password error", async () => {
      User.findOne = jest.fn().mockResolvedValueOnce(loginBody);
      const passwordError = new CustomError(
        "Password is incorrect",
        401,
        "Wrong credentials"
      );

      bcrypt.compare = jest.fn().mockResolvedValueOnce(false);

      await loginUser(req as Request, res as Response, next as NextFunction);

      expect(next).toBeCalledWith(passwordError);
    });
  });

  describe("when it receives a valid username and a valid password", () => {
    test("Then it should invoke the response method with a 200 status and its json method with a token", async () => {
      const expectedStatus = 200;
      User.findOne = jest.fn().mockResolvedValueOnce(loginBody);
      bcrypt.compare = jest.fn().mockResolvedValueOnce(true);
      jwt.sign = jest.fn().mockReturnValueOnce(token);

      await loginUser(req as Request, res as Response, next as NextFunction);

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
      expect(res.json).toHaveBeenCalled();
    });
  });
});
