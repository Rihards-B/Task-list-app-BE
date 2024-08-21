import { Request, Response } from "express";
import { Task } from "../models/Task";
import { TaskService } from "../services/TaskService";
import { Error } from "mongoose";
import { formatErrors } from "../database/formatErrors";
import { TaskResponses } from "../responses/TaskResponses";

let taskService = new TaskService();

export const createTask = async (req: Request, res: Response) => {
    let errors: { [key: string]: string } | null = null;
    const requestBody = await req.body;
    const taskRes: Error.ValidationError | Task | null = await taskService.createTask(requestBody);
    if (taskRes) {
        if (taskRes instanceof Error.ValidationError) {
            errors = formatErrors(taskRes);
        }
        if (errors) {
            TaskResponses.CreationErrors(res, errors);
        } else {
            TaskResponses.TaskCreated(res);
        }
    }
    res.status(500);
}

export const getTasks = async (req: Request, res: Response) => {
    try {
        const tasks: Task[] = await taskService.getTasks();
        TaskResponses.TasksFound(res, tasks);
    } catch (error) {
        console.log("getTasks failed to retrieve tasks: ", error);
    }
}

export const getTask = async (req: Request, res: Response) => {
    try {
        const task: Task | undefined = await taskService.getTask(req.params.id);
        if (task) {
            TaskResponses.TaskFound(res, task);
        } else {
            TaskResponses.TaskNotFoundID(res, req.params.id);
        }
    } catch (error) {
        console.log("getTaskDetails failed: ", error);
    }
}

export const deleteTask = async (req: Request, res: Response) => {
    try {
        const result = await taskService.deleteTask(req.params.id);
        if (result) {
            TaskResponses.TaskDeleted(res, req.params.id);
        } else {
            TaskResponses.TaskNotFoundID(res, req.params.id);
        }
    } catch (error) {
        console.log(error);
    }
}