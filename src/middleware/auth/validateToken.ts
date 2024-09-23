import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import dotenv from "dotenv"
import { AuthResponses } from "../../responses/AuthResponses";

dotenv.config();

export const validateToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = validationResult(req);
    if (result.isEmpty()) {
      const SESSION_SECRET = process.env.SESSION_SECRET;
      if (SESSION_SECRET) {
        jwt.verify(req.cookies.authJWT, SESSION_SECRET)
        next();
      }
    } else {
      AuthResponses.NotAuthorized(res);
    }
  } catch (error) {
    console.log(error);
  }
}