import user from "./user";
import express from "express";
import notes from "./notes";

import attachCurrentUser from '../middlewares/attachCurrentUser';
import isAuth from '../middlewares/isAuth'

const app = express();

user(app);
notes(app, [isAuth, attachCurrentUser]);

export default app;
