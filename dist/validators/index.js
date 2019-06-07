"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const check_1 = require("express-validator/check");
const checkValidationErrors = (req, res, next) => {
    const errors = check_1.validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            errors: errors.array()
        });
    }
    next();
};
const createValidator = (...validators) => {
    return [...validators, checkValidationErrors];
};
exports.signup = createValidator(check_1.body("name")
    .exists()
    .withMessage("Missing name field")
    .isString()
    .withMessage("Name must be a string"), check_1.body("email")
    .exists()
    .withMessage("Missing email field")
    .isEmail()
    .withMessage("Bad email"), check_1.body("password")
    .exists()
    .withMessage("Missing password field")
    .isString()
    .withMessage("Bad password"));
exports.login = createValidator(check_1.body("email")
    .exists()
    .withMessage("Missing email field")
    .isEmail()
    .withMessage("Bad email"), check_1.body("password")
    .exists()
    .withMessage("Missing password field")
    .isString()
    .withMessage("Bad password"));
