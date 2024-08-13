import { isValidObjectId } from "mongoose";
import { Task, TaskModel } from "../models/Task"

export class TaskService {
    public createTask = (task: Task) => {
        task.createdOn = new Date();
        TaskModel.create(task);
    }

    public getTasks = async () => {
        return await TaskModel.find()
    }

    public getTask = async (id: string) => {
        try {
            if(isValidObjectId(id)) {
                const task = await TaskModel.findById(id);
                if(task != undefined) {
                    return task
                }
            }
            return undefined;
        } catch(error) {
            console.log(error);
        }
    }
}