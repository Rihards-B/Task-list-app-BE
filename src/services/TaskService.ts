import { Task, TaskModel } from "../models/Task"

export class TaskService {
    public createTask = (task: Task) => {
        task.createdOn = new Date();
        TaskModel.create(task);
    }
}