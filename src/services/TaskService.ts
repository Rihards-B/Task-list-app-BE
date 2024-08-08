import { Task, TaskModel } from "../models/Task"

export class TaskService {
    public createTask = (task: Task) => {
        task.createdOn = new Date();
        TaskModel.create(task);
    }

    public getTasks = () => {
        return TaskModel.find()
    }

    public getTask = (id: string) => {
        return TaskModel.findById(id);
    }
}