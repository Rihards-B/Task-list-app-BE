import { Request, Response } from "express";
import { User } from "../models/User";
import { UserResponses } from "../responses/UserResponses";
import { UserService } from "../services/UserService";
import { BaseEndpoint } from "./BaseController";

let userService = new UserService();

export const getUsers = BaseEndpoint(async (req: Request, res: Response) => {
    const users: User[] | undefined = await userService.getUsers();
    if (users) {
        UserResponses.UsersFound(res, users);
    } else {
        UserResponses.UserNotFound(res);
    }
})

export const getUser = BaseEndpoint(async (req: Request, res: Response) => {
    const user: User | undefined = await userService.getUser(req.params.id);
    if (user) {
        UserResponses.UserFound(res, user);
    } else {
        UserResponses.UserNotFound(res);
    }
})

export const currentUser = BaseEndpoint(async (req: Request, res: Response) => {
    const token = req.cookies.authJWT;
    const userId = userService.getUserIdFromToken(token);
    const user = await userService.getUser(userId);
    if (user) {
        UserResponses.CurrentUser(res, user);
    } else {
        UserResponses.UserNotFound(res);
    }
})