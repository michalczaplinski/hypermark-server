import express, { Request, Response } from "express";

import { login, signup } from "../validators";
import AuthService from "../services/auth";

export default (app: express.Application) => {
  app.post("/login", login, async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
      const authServiceInstance = new AuthService();
      const { user, token } = await authServiceInstance.login(email, password);
      return res.status(200).json({ user, token });
    } catch (err) {
      console.error(err);
      return res.status(500);
    }
  });

  app.post("/signup", login, async (req: Request, res: Response) => {
    try {
      const { name, email, password } = req.body;
      const authServiceInstance = new AuthService();
      const { user, token } = await authServiceInstance.signUp(
        email,
        password,
        name
      );
      return res.json({ user, token }).status(200);
    } catch (err) {
      console.error(err);
      return res.status(500);
    }
  });
};
