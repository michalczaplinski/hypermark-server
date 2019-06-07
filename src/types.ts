import { Request } from "express";
import { Document } from "mongoose";

export interface IUserCore {
  _id: string;
  email: string;
  name: string;
}

export interface IUser extends IUserCore {
  password?: string;
  salt?: string;
}

export type IRequest = {
  token: IUserCore;
  currentUser: IUser & Document;
} & Request;

export class AppError {
  httpCode: number;
  name: string;
  description?: string;
  isOperational?: boolean;

  constructor(
    httpCode: number,
    name: string,
    description?: string,
    isOperational?: boolean
  ) {
    Error.call(this);
    Error.captureStackTrace(this);
    this.name = name;
    this.httpCode = httpCode;
    this.description = description;
    this.isOperational = isOperational;
  }
}
