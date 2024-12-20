import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv"
import { AuthResponses } from "../../responses/AuthResponses";
import { RoleModel } from "../../models/Role";
import { JWT } from "../../models/JWT";
import { UserService } from "../../services/UserService";
import { User } from "../../models/User";
import { ReadPreference } from "mongodb";

dotenv.config();

const userService = new UserService();

export const validateToken = (roleNames?: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (req.cookies.authJWT) {
        const SESSION_SECRET = process.env.SESSION_SECRET;
        if (SESSION_SECRET) {
          const userData: JWT = jwt.verify(req.cookies.authJWT, SESSION_SECRET) as JWT;
          // If roleName is passed in then check if user has that role
          if (roleNames) {
            const sessionUser = await userService.getUser(userData.userID);
            if (sessionUser) {
              if (await checkRoles(sessionUser, roleNames)) {
                next();
                return;
              }
            }
          } else {
            // If no roleName is passed as argument, just check if JWT is valid
            if (userData) {
              next();
              return;
            }
          }
        }
      }
      AuthResponses.NotAuthorized(res);
    } catch (error) {
      console.log(error);
    }
  }
}

async function checkRoles(user: User, roleNames: string[]): Promise<boolean> {
  for (const roleName of roleNames) {
    if (user.roles.find(role => role == roleName)) {
      return true;
    }
  }
  return false
}