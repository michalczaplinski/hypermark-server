import { ErrorNames } from './names';

export class AppError {
  httpCode: number;
  name: string;
  message: string;
  isOperational?: boolean;

  constructor(
    httpCode: number,
    name: keyof typeof ErrorNames,
    message?: string,
    isOperational: boolean = true
  ) {
    Error.call(this);
    Error.captureStackTrace(this);
    this.name = name;
    this.message = message || ErrorNames[name];
    this.httpCode = httpCode;
    this.isOperational = isOperational;
  }
}
