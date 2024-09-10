import jwt from "jsonwebtoken";
import { User } from "../models/User";

export class AuthService {
    public getToken(secret: string, user: User) {
        let token: string | undefined = undefined;
        token = jwt.sign({
            "userID": user._id,
            "username": user.username,
            "first_name": user.first_name,
            "last_name": user.last_name,
            "expires": Math.floor(Date.now() / 1000) + 3600
        },
            secret)
        return token;
    }
}