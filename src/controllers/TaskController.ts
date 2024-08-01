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