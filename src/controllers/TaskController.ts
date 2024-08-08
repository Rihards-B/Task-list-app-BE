import { Request, Response } from "express";
import { Task, TaskModel  } from "../models/Task";
import {TaskService} from "../services/TaskService";

let taskService = new TaskService();



export const getTask = async (req: Request, res: Response) => {
    res.send("Getting task with ID: "+ req.params.id);
}

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