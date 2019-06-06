import { body, validationResult } from "express-validator/check";
import { Handler, Request, Response, NextFunction } from "express";

const checkValidationErrors = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      errors: errors.array()
    });
  }
  next();
};

const createValidator = (...validators: Handler[]) => {
  return [...validators, checkValidationErrors];
};

export const signup = createValidator(
  body("name")
    .exists()
    .withMessage("Missing name field")
    .isString()
    .withMessage("Name must be a string"),
  body("email")
    .exists()
    .withMessage("Missing email field")
    .isEmail()
    .withMessage("Bad email"),
  body("password")
    .exists()
    .withMessage("Missing password field")
    .isString()
    .withMessage("Bad password")
);

export const login = createValidator(
  body("email")
    .exists()
    .withMessage("Missing email field")
    .isEmail()
    .withMessage("Bad email"),
  body("password")
    .exists()
    .withMessage("Missing password field")
    .isString()
    .withMessage("Bad password")
);
