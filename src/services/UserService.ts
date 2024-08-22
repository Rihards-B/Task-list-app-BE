import { ObjectId, isValidObjectId } from "mongoose";
import { UserModel } from "../models/User"

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
}