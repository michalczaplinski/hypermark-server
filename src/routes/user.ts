import AuthService from "../services/auth";
import express from "express";

export default (app: express.Application) => {
  app.post("/user/login", async (req, res) => {
    const email = req.body.user.email;
    const password = req.body.user.password;
    try {
      const authServiceInstance = new AuthService();
      const { user, token } = await authServiceInstance.login(email, password);
      return res
        .status(200)
        .json({ user, token })
        .end();
    } catch (e) {
      return res
        .json(e)
        .status(500)
        .end();
    }
  });

  app.post("/user/signup", async (req, res) => {
    try {
      const { name, email, password } = req.body.user;
      const authServiceInstance = new AuthService();
      const { user, token } = await authServiceInstance.signUp(
        email,
        password,
        name
      );
      return res
        .json({ user, token })
        .status(200)
        .end();
    } catch (e) {
      return res
        .json(e)
        .status(500)
        .end();
    }
  });
};
