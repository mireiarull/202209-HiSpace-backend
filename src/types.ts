import type { Request } from "express";
import type { JwtPayload } from "jsonwebtoken";

export interface Robot {
  _id: string;
  name: string;
  image: string;
  features: {
    speed: number;
    endurance: number;
    creationDate: number;
  };
}

export interface Credentials {
  username: string;
  password: string;
}

export interface UserTokenPayload extends JwtPayload {
  id: string;
  username: string;
}

export interface RegisterData extends Credentials {
  email: string;
}

export interface CustomRequest extends Request {
  userId: string;
}
