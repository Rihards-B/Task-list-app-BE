import { Request, Response } from "express";
import { Task, TaskModel  } from "../models/Task";
import {TaskService} from "../services/TaskService";

let taskService = new TaskService();

export const createTask = async (req: Request, res: Response) => {
    const requestBody = await req.body;
    await taskService.createTask(requestBody);

    res.status(200).json({"Message":"Task created!"});
}

export const getTasks = async (req: Request, res: Response) => {
    try {
        const tasks: Task[] = await taskService.getTasks();
        res.status(200).json(tasks);
    } catch(error) {
        console.log("getTasks failed to retrieve tasks: ", error);
    }
}

export const getTask = async (req: Request, res: Response) => {
    try {
        const task: Task | null  = await taskService.getTask(req.params.id);
        if(task) {
            res.status(200).json(task);
        } else {
            res.status(404).send("Task with ID: "+req.params.id+" couldn't be found");
        }
    } catch(error) {
        console.log("getTaskDetails failed: ", error);
    }
}