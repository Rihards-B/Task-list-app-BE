import { Response } from "express";
import { User } from "../models/User";

export namespace AuthResponses {
    export const LoggedIn = (response: Response, token: string, user: User) => {
        response.status(200).cookie("authJWT", token, { httpOnly: true });
        response.json({ "isLoggedIn": true, "user": user });
    }

    export const InvalidCredentials = (response: Response) => {
        response.status(200).json({ "isLoggedIn": false });
    }

    export const NotAuthorized = (response: Response) => {
        response.status(401).json({ "msg": "Unauthorized" });
    }

    export const UsernameTaken = (response: Response) => {
        response.status(400).json(
            {
                "messages": [
                    "Username is already taken"
                ]
            }
        );
    }

    export const LoggedOut = (response: Response) => {
        response.clearCookie("authJWT", { httpOnly: true });
        response.json({ "msg": "Logged out!" });
    }
}
