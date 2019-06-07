import express, { Request, Response, NextFunction } from "express";

import { login, signup } from "../validators";
import AuthService from "../services/auth";

const authServiceInstance = new AuthService();

export default (app: express.Application) => {
  app.post(
    "/login",
    login,
    async (req: Request, res: Response, next: NextFunction) => {
      const { email, password } = req.body;
      try {
        const { user, token } = await authServiceInstance.login(
          email,
          password
        );
        return res.status(200).json({ user, token });
      } catch (err) {
        return next(err);
      }
    }
  );

  app.post(
    "/signup",
    signup,
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { name, email, password } = req.body;
        const { user, token } = await authServiceInstance.signUp(
          email,
          password,
          name
        );
        return res.json({ user, token }).status(200);
      } catch (err) {
        return next(err);
      }
    }
  );
};
