"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const validators_1 = require("../validators");
const auth_1 = __importDefault(require("../services/auth"));
exports.default = (app) => {
    app.post("/login", validators_1.login, async (req, res) => {
        const { email, password } = req.body;
        try {
            const authServiceInstance = new auth_1.default();
            const { user, token } = await authServiceInstance.login(email, password);
            return res.status(200).json({ user, token });
        }
        catch (err) {
            console.error(err);
            return res.status(500);
        }
    });
    app.post("/signup", validators_1.login, async (req, res) => {
        try {
            const { name, email, password } = req.body;
            const authServiceInstance = new auth_1.default();
            const { user, token } = await authServiceInstance.signUp(email, password, name);
            return res.json({ user, token }).status(200);
        }
        catch (err) {
            console.error(err);
            return res.status(500);
        }
    });
};
