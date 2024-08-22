import { Request, Response } from "express";
import { User } from "../models/User";
import { UserResponses } from "../responses/UserResponses";
import { UserService } from "../services/UserService";

let userService = new UserService();

export const getUsers = async (req: Request, res: Response) => {
    try {
        const users: User[] | undefined = await userService.getUsers();
        if (users) {
            UserResponses.UsersFound(res, users);
        }
    } catch (error) {
        console.log(error);
    }
}

export const getUser = async (req: Request, res: Response) => {
    try {
        const user: User | undefined = await userService.getUser(req.params.id);
        if (user) {
            UserResponses.UserFound(res, user);
        }
    } catch (error) {
        console.log(error);
    }
}