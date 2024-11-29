import { Request, Response } from "express";
import { matchedData } from "express-validator";
import bcrypt from "bcrypt";
import { User } from "../models/User";
import { UserService } from "../services/UserService";
import { AuthService } from "../services/AuthService";
import { BaseEndpoint } from "./BaseController";
import { AuthResponses } from "../responses/AuthResponses";
import dotenv from "dotenv";
import { SharedResponses } from "../responses/SharedResponses";

dotenv.config();

const userService = new UserService();
const authService = new AuthService();

export const login = BaseEndpoint(async (req: Request, res: Response) => {
    const data = matchedData(req);
    const user: User | undefined = await userService.getUserByUsername(data.username);
    if (user) {
        const secret: string | undefined = process.env.SESSION_SECRET;
        let correctPassword = false;
        correctPassword = await bcrypt.compare(data.password, user.password);

        let token: string | undefined = undefined;

        if (secret && correctPassword) {
            token = await authService.getToken(secret, user);
            // Sanitizing user object for response
            user.password = "";
            AuthResponses.LoggedIn(res, token, user);
            return;
        }
    }
    AuthResponses.InvalidCredentials(res);
})

export const logout = BaseEndpoint((req: Request, res: Response) => {
    AuthResponses.LoggedOut(res);
})

export const register = BaseEndpoint(async (req: Request, res: Response) => {
    const secret: string | undefined = process.env.SESSION_SECRET;
    const data = matchedData(req);
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user = await userService.createUser(data.username,
        hashedPassword,
        data.firstName,
        data.lastName
    );

    if (user && secret) {
        const token = authService.getToken(secret, user);
        user.password = ""
        AuthResponses.LoggedIn(res, token, user);
        return;
    }

    if (!user) {
        AuthResponses.UsernameTaken(res);
        return;
    }

    SharedResponses.InternalServerError(res);
})
