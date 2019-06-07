"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const argon2_1 = __importDefault(require("argon2"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const crypto_1 = require("crypto");
const user_1 = __importDefault(require("../models/user"));
class AuthService {
    async login(email, password) {
        const user = await user_1.default.findOne({ email });
        if (!user) {
            throw new Error("User not found");
        }
        else if (!user.password) {
            throw new Error("The user does not have a password!");
        }
        else {
            const correctPassword = await argon2_1.default.verify(user.password, password);
            if (!correctPassword) {
                throw new Error("Incorrect password");
            }
        }
        return {
            user: {
                email: user.email,
                name: user.name
            },
            token: this.generateJWT(user)
        };
    }
    async signUp(email, password, name) {
        const salt = crypto_1.randomBytes(32);
        const passwordHashed = await argon2_1.default.hash(password, { salt });
        const user = await user_1.default.create({
            password: passwordHashed,
            email,
            salt: salt.toString("hex"),
            name
        });
        const token = this.generateJWT(user);
        return {
            user: {
                email: user.email,
                name: user.name
            },
            token
        };
    }
    generateJWT(user) {
        const secret = process.env.JWT_SECRET;
        if (!secret)
            throw new Error("There is no JWT secret set!");
        return jsonwebtoken_1.default.sign({
            data: {
                _id: user._id,
                name: user.name,
                email: user.email
            }
        }, secret);
    }
}
exports.default = AuthService;
