import { Request, Response } from "express";
import { Task, TaskModel  } from "../models/Task";
import {TaskService} from "../services/TaskService";
import { Error } from "mongoose";
import { formatErrors } from "../database/formatErrors";

let taskService = new TaskService();

export const createTask = async (req: Request, res: Response) => {
    let errors: {[key: string]: string} | null = null;
    const requestBody = await req.body;
    const taskRes: Error.ValidationError | Task | null = await taskService.createTask(requestBody);
    if(taskRes) {
        if (taskRes instanceof Error.ValidationError) {
            errors = formatErrors(taskRes);
        }

        if(errors) {
            res.status(400).json(errors);
        } else {
            res.status(200).json({"Message":"Task created!"});
        }
    }
    res.status(500);
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
        const task: Task | undefined  = await taskService.getTask(req.params.id);
        if(task) {
            res.status(200).json(task);
        } else {
            res.status(404).send("Task with ID: "+req.params.id+" couldn't be found");
        }
    } catch(error) {
        console.log("getTaskDetails failed: ", error);
    }
}