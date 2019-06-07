"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = __importDefault(require("../models/user"));
exports.default = async (req, res, next) => {
    try {
        const decodedUser = req.token.data;
        const user = await user_1.default.findOne({ _id: decodedUser._id });
        if (!user) {
            res.status(401).end();
        }
        req.currentUser = user;
        return next();
    }
    catch (err) {
        console.error(err);
        return res.status(500);
    }
};
