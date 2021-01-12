import { Request, RequestHandler } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const getTokenFromRequest = (req: Request) => {
  const auth: string = req.get("Authorization");
  console.log(auth);
  if (auth && auth.trim().startsWith("bearer")) return auth.substring(7);
  else return null;
};

const validateToken: RequestHandler = (req, _res, next) => {
  const token = getTokenFromRequest(req);
  console.log(token);
  const decodedToken = token
    ? (jwt.verify(token, process.env.TOKEN_SECRET) as Record<string, string>)
    : null;
  if (!token || !decodedToken.id) {
    return next({ status: 403, message: "Token invalid or missing" });
  } else {
    req.body.decodedToken = decodedToken; //eslint-disable-line
    next();
  }
};

export default validateToken;
