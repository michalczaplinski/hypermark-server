import { body } from "express-validator/check";

export const signup = [
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
];

export const login = [
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
];
