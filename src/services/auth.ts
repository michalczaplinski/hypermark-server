import argon2 from "argon2";
import jwt from "jsonwebtoken";
import { randomBytes } from "crypto";

import UserModel from "../models/user";
import { IUser, AppError } from "../types";

export default class AuthService {
  public async login(email: string, password: string): Promise<any> {
    const user = await UserModel.findOne({ email });
    if (!user) {
      throw new AppError(400, "User not found");
    } else if (!user.password) {
      throw new AppError(400, "The user does not have a password");
    } else {
      const correctPassword = await argon2.verify(user.password, password);
      if (!correctPassword) {
        throw new AppError(400, "Incorrect password");
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

  public async signUp(
    email: string,
    password: string,
    name: string
  ): Promise<any> {
    const salt = randomBytes(32);
    const passwordHashed = await argon2.hash(password, { salt });

    const user = await UserModel.create({
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

  private generateJWT(user: IUser) {
    const secret = process.env.JWT_SECRET;
    if (!secret) throw new AppError(401, "There is no JWT secret set");
    return jwt.sign(
      {
        _id: user._id,
        name: user.name,
        email: user.email
      },
      secret
    );
  }
}
