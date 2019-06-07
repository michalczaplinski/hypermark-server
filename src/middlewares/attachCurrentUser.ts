import UserModel from "../models/user";
import { NextFunction, Response } from "express";
import { IRequest } from "../types";

const attachCurrentUser = async (
  req: IRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const decodedUser = req.token;
    const user = await UserModel.findOne({ _id: decodedUser._id });
    if (!user) {
      return res.status(401).end();
    }
    req.currentUser = user;
    return next();
  } catch (err) {
    return next(err);
  }
};

export default attachCurrentUser;
