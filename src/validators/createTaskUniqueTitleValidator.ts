import { CustomValidator } from "express-validator";
import { Task, TaskModel } from "../models/Task";

export const CreateTaskUniqueTitleValidator: CustomValidator = async (value) => {
    const taskInDB: Task | null = await TaskModel.findOne({ title: value });
    if (taskInDB) {
        throw new Error("Title must be unique");
    }
}