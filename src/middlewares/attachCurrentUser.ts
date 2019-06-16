import UserModel from "../models/user";
import { NextFunction, Response, RequestHandler } from "express";
import { Request } from "../types";

const attachCurrentUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const decodedUser = req.token;
    if (!decodedUser) return res.status(401).end();

    const user = await UserModel.findOne({ _id: decodedUser._id });
    if (!user) return res.status(401).end();

    req.currentUser = user;
    next();
  } catch (err) {
    next(err);
  }
};

export default attachCurrentUser;
