import { Request, Response } from "express";
import { Task } from "../models/Task";
import { TaskService } from "../services/TaskService";
import { Error } from "mongoose";
import { formatErrors } from "../database/formatErrors";
import { TaskResponses } from "../responses/TaskResponses";
import { SharedResponses } from "../responses/SharedResponses";
import { BaseEndpoint } from "./BaseController";
import { UserService } from "../services/UserService";

let userService = new UserService();
let taskService = new TaskService();

export const createTask = BaseEndpoint(async (req: Request, res: Response) => {
    let errors: { [key: string]: string } | null = null;
    const requestBody = await req.body;
    requestBody._id = null;
    const taskRes: Error.ValidationError | Task | null = await taskService.createTask(requestBody);
    if (taskRes) {
        if (taskRes instanceof Error.ValidationError) {
            errors = formatErrors(taskRes);
            SharedResponses.CreationErrors(res, errors);
        } else {
            TaskResponses.TaskCreated(res);
        }
    } else {
        console.log("No result from task service");
        SharedResponses.InternalServerError(res);
    }
})

export const getTasks = BaseEndpoint(async (req: Request, res: Response) => {
    const token = req.cookies.authJWT;
    const currentUser = await userService.getUser(userService.getUserIdFromToken(token));
    const tasks: Task[] | undefined = await taskService.getTasks();
    if (tasks) {
        if (currentUser?.roles.includes("Admin")) {
            TaskResponses.TasksFound(res, tasks);
        } else {
            const filteredTasks = tasks.filter(task => task.groups?.some(group => currentUser?.groups?.includes(group)));
            TaskResponses.TasksFound(res, filteredTasks);
        }
    }
})

export const getTask = BaseEndpoint(async (req: Request, res: Response) => {
    const token = req.cookies.authJWT;
    const currentUser = await userService.getUser(userService.getUserIdFromToken(token));
    const task: Task | undefined = await taskService.getTask(req.params.id);
    if (task && (task.groups?.some(group => currentUser?.groups?.includes(group)) || currentUser?.roles.includes("Admin"))) {
        TaskResponses.TaskFound(res, task);
    } else {
        TaskResponses.TaskNotFoundID(res, req.params.id);
    }
})

export const deleteTask = BaseEndpoint(async (req: Request, res: Response) => {
    const result = await taskService.deleteTask(req.params.id);
    if (result) {
        TaskResponses.TaskDeleted(res, result);
    } else {
        TaskResponses.TaskNotFoundID(res, req.params.id);
    }
})

export const updateTask = BaseEndpoint(async (req: Request, res: Response) => {
    let errors: { [key: string]: string } | null = null;
    const requestBody = await req.body;
    const taskRes: Error.ValidationError | Task | null = await taskService.updateTask(requestBody);
    if (taskRes) {
        if (taskRes instanceof Error.ValidationError) {
            errors = formatErrors(taskRes);
        }
        if (errors) {
            SharedResponses.CreationErrors(res, errors);
        } else {
            TaskResponses.TaskUpdated(res);
        }
    } else {
        TaskResponses.TaskNotFoundID(res, req.body._id);
    }
})