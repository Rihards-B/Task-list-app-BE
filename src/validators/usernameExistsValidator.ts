import { CustomValidator } from "express-validator";
import { UserModel } from "../models/User";

export const UserExistsValidator: CustomValidator = async (value: string) => {
    return await UserModel.findOne({ username: value }) ? true : false
}