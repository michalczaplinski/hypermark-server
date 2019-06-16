import { Request, Response, NextFunction, RequestHandler as Handler } from "express";
import { Document } from "mongoose";
import { RequestHandler } from "express-jwt";

export interface IUserCore {
  _id: string;
  email: string;
  name: string;
}

export interface IUser extends IUserCore {
  password?: string;
  salt?: string;
}

export type Request = {
  token?: IUserCore;
  currentUser?: IUser & Document;
} & Request;

export interface IMiddleware {
  (req: Request, res: Response, next: NextFunction): any
}