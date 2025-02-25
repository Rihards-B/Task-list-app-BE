import { CustomValidator } from "express-validator";
import { Task, TaskModel } from "../models/Task";
import { ObjectId } from "mongoose";

export const EditTaskUniqueTitleValidator: CustomValidator = async (value, { req }) => {
    const incommingTask: Task = req.body;
    if (incommingTask._id) {
        const taskInDBbyTitle: Task | null = await TaskModel.findOne({ title: value });

        if (taskInDBbyTitle?._id?.toString() === incommingTask._id.toString() || !taskInDBbyTitle) {
            return true;
        } else {
            throw new Error("New title must be unique")
        }
    }
}