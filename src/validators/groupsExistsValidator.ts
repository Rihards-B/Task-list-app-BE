import { CustomValidator } from "express-validator";
import { TaskModel } from "../models/Task";
import { Group } from "../models/Group";

export const GroupsExistsValidator: CustomValidator = async (value: string[]) => {
    value.forEach(async group => {
        const groupInDB: Group | null = await TaskModel.findOne({ name: group });
        if (!groupInDB) {
            throw new Error("Group " + value + " doesn't exist");
        }
    })
}