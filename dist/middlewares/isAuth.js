"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_jwt_1 = __importDefault(require("express-jwt"));
const getTokenFromHeader = (req) => {
    if (req.headers.authorization &&
        req.headers.authorization.split(" ")[0] === "Bearer") {
        return req.headers.authorization.split(" ")[1];
    }
};
const secret = process.env.JWT_SECRET;
if (!secret) {
    if (!secret)
        throw new Error("There is no JWT secret set!");
}
exports.default = express_jwt_1.default({
    secret,
    userProperty: "token",
    getToken: getTokenFromHeader
});
