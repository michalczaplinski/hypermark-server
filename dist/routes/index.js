"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = __importDefault(require("./user"));
const express_1 = __importDefault(require("express"));
// import items from "./items";
const app = express_1.default();
user_1.default(app);
// items(app);
exports.default = app;
