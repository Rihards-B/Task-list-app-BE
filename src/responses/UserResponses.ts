import { Response } from "express";
import { User } from "../models/User";

export namespace UserResponses {
    export const UsersFound = (response: Response, users: User[]) => {
        response.status(200).json(users);
    }

    export const UserFound = (response: Response, user: User) => {
        response.status(200).json(user);
    }

    export const CurrentUser = (response: Response, user: User) => {
        response.status(200).json(user);
    }

    export const UserNotFound = (response: Response) => {
        response.status(404).json({ "msg": "User not found!" });
    }
}