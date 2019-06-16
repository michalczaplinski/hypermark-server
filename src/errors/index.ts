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
