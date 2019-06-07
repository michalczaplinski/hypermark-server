import { MongoError } from "mongodb";
import { Error as MongooseError } from "mongoose";
import { Request, Response, NextFunction } from "express";
import { AppError } from "../types";

type IError = MongoError | MongooseError.ValidationError | AppError;

export default async (
  err: IError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err);

  // We want to grab the first validator error
  // https://mongoosejs.com/docs/api.html#document_Document-invalidate
  if (err instanceof MongooseError.ValidationError) {
    return res.status(422).json({
      error: "ValidationError",
      message: "Validation Error",
      validationErrors: err.errors
    });
  }

  if (err instanceof MongoError && err.code === 11000 && err.errmsg) {
    const property = err.errmsg.split("index: ")[1].split("_")[0];
    return res.status(422).json({
      error: "DuplicateKey",
      message: `${property} must be unique`
    });
  }

  if (err instanceof AppError) {
    return res
      .status(err.httpCode)
      .json({ error: err.name, message: err.name });
  }

  return res.status(500).json({
    error: "ServerError",
    message: "There was an unexpected server error"
  });
};
