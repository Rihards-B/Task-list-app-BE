import { isValidObjectId } from "mongoose";
import { UserModel } from "../models/User"
import jwt from "jsonwebtoken";
import { JWT } from "../models/JWT";

export class UserService {
    public getUsers = async () => {
        try {
            return await UserModel.find().select(["-password"]);
        } catch (error) {
            console.log(error);
        }
    }

    public getUser = async (userID: string) => {
        try {
            if (isValidObjectId(userID)) {
                const user = await UserModel.findById(userID).select(["-password"]);
                if (user) {
                    return user;
                }
            }
            return undefined;
        } catch (error) {
            console.log(error);
        }
    }

    public getUserByUsername = async (username: string) => {
        try {
            const user = await UserModel.findOne({ "username": username });
            if (user) {
                return user;
            }
            return undefined
        } catch (error) {
            console.log(error);
        }
    }

    public getUserIdFromToken(token: string): string {
        const userJWT: JWT = <JWT>jwt.decode(token);
        return userJWT.userID;
    }
}