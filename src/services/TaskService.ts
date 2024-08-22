import { Error, isValidObjectId } from "mongoose";
import { Task, TaskModel } from "../models/Task"

export class TaskService {
    public getTasks = async () => {
        try {
            return await TaskModel.find()
        } catch (error) {
            console.log(error);
        }
    }

    public getTask = async (id: string) => {
        try {
            if (isValidObjectId(id)) {
                const task = await TaskModel.findById(id);
                if (task) {
                    return task
                }
            }
            return undefined;
        } catch (error) {
            console.log(error);
        }
    }

    public createTask = async (task: Task): Promise<Task | Error.ValidationError | null> => {
        try {
            task.createdOn = new Date();
            await TaskModel.validate(task);
            return await TaskModel.create(task);
        } catch (error) {
            if (error instanceof Error.ValidationError) {
                return error;
            } else {
                console.log(error);
                return null;
            }
        }
    }

    public deleteTask = async (id: string) => {
        try {
            if (isValidObjectId(id)) {
                const response = await TaskModel.findByIdAndDelete(id);
                return response;
            } else {
                return null;
            }
        } catch (error) {
            console.log(error);
        }
    }

    public updateTask = async (task: Task): Promise<Task | Error.ValidationError | null> => {
        try {
            if (task._id) {
                await TaskModel.validate(task);
                const response = await TaskModel.findByIdAndUpdate(task._id, task);
                return response;
            }
            return null;
        } catch (error) {
            if (error instanceof Error.ValidationError) {
                return error;
            } else {
                console.log(error);
                return null;
            }
        }
    }
}