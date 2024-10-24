import { isValidObjectId } from "mongoose";
import { UserModel, User } from "../models/User"
import jwt from "jsonwebtoken";
import { JWT } from "../models/JWT";
import { Role, RoleModel } from "../models/Role";

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

    public createUser = async (username: string, password: string, firstName: string, lastName: string) => {
        try {
            const role: Role | null = await RoleModel.findOne({ roleName: "User" }, "_id roleName");
            console.log(role);
            if (!(await this.getUserByUsername(username)) && role) {
                const user: User = {
                    username: username,
                    password: password,
                    firstName: firstName,
                    lastName: lastName,
                    roles: [role]
                }
                return await UserModel.create(user);
            }
        } catch (error) {
            console.log(error);
        }
    }

    public updateUser = async (userId: string, user: User) => {
        await UserModel.findByIdAndUpdate(userId, user);
    }
}