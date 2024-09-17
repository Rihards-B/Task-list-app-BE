import { Response } from "express";

export namespace AuthResponses {
    export const LoggedIn = (response: Response, token: string, username: string) => {
        response.status(200).cookie("authJWT", token, { httpOnly: true });
        response.json({ "isLoggedIn": true, "username": username });
    }

    export const InvalidCredentials = (response: Response, errors?: Object) => {
        response.status(200).json({ "isLoggedIn": false, "username": "", "errors": errors });
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
}
