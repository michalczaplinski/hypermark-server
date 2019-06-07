import jwt from "express-jwt";
import { Request } from "express";

const getTokenFromHeader = (req: Request) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  ) {
    return req.headers.authorization.split(" ")[1];
  }
};

const secret = process.env.JWT_SECRET;
if (!secret) {
  if (!secret) throw new Error("There is no JWT secret set!");
}

export default jwt({
  secret,
  userProperty: "token", // this is where the next middleware can find the encoded data generated in services/auth:generateToken
  getToken: getTokenFromHeader
});
