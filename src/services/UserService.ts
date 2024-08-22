import { ObjectId, isValidObjectId } from "mongoose";
import { UserModel } from "../models/User"

export class UserService {
    public getUsers = async () => {
        try {
            return await UserModel.find();
        } catch (error) {
            console.log(error);
        }
    }

    public getUser = async (userID: string) => {
        try {
            if (isValidObjectId(userID)) {
                const user = await UserModel.findById(userID);
                if (user) {
                    return user;
                }
            }
            return undefined;
        } catch (error) {
            console.log(error);
        }
    }
}