import { Response } from "express";
import { User } from "../models/User";

export namespace UserResponses {
    export const UsersFound = (response: Response, users: User[]) => {
        response.status(200).json(users);
    }

    export const UserFound = (response: Response, user: User) => {
        response.status(200).json(user);
    }
}