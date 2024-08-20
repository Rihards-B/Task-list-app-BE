import { Error, isValidObjectId } from "mongoose";
import { Task, TaskModel } from "../models/Task"

export class TaskService {
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

    public createTask = async (task: Task): Promise<Task | Error.ValidationError | null> => {
        try{
            task.createdOn = new Date();
            await TaskModel.validate(task);
            return await TaskModel.create(task);
        } catch(error) {
            if(error instanceof Error.ValidationError){
                return error;
            } else {
                console.log(error);
                return null;
            }
        }
    }
}