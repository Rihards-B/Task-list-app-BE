import { Request, Response } from "express";
import { User } from "../models/User";
import { UserResponses } from "../responses/UserResponses";
import { UserService } from "../services/UserService";
import { BaseEndpoint } from "./BaseController";
import { matchedData } from "express-validator";
import { RoleModel } from "../models/Role";
import { GroupModel } from "../models/Group";

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

export const updateUser = BaseEndpoint(async (req: Request, res: Response) => {
    let invalidData: boolean = false;
    const data: User = matchedData(req);
    // Fetching valid roles from DB
    const dbRoles: string[] = (await RoleModel.find()).map(role => role.name);
    const dbGroups: string[] = (await GroupModel.find()).map(group => group.name);

    // Check if the passed in roles and groups from FE exist
    data.roles.forEach(role => {
        if (!dbRoles.includes(role)) {
            invalidData = true;
            UserResponses.InvalidRole(res, role);
            return;
        }
    })
    data.groups?.forEach(group => {
        if (!dbGroups.includes(group)) {
            invalidData = true;
            UserResponses.InvalidGroup(res, group);
            return;
        }
    })

    if (!invalidData) {
        await userService.updateUser(req.params.id, data);
        UserResponses.UserUpdated(res, data);
    }
})