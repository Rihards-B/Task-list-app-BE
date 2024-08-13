import { Response, response } from "express";
import { Task } from "../models/Task";

export namespace TaskResponses {
    export const TaskNotFoundID = (response: Response, id: string) => {
        response.status(404).json({ "Message": "Task with ID: " + id + " not found!" });
    }

    export const InvalidTaskID = (response: Response, id: string) => {
        response.status(400).json({ "Message": "Invalid ID format: " + id + " !" });
    }

    export const TaskDeleted = (response: Response, id: string) => {
        response.status(200).json({ "Message": "Task " + id + " Deleted!" });
    }

    export const TaskCreated = (response: Response) => {
        response.status(200).json({ "Message": "Task created!" });
    }

    export const CreationErrors = (response: Response, errors: { [key: string]: string }) => {
        response.status(400).json(errors);
    }

    export const TasksFound = (response: Response, tasks: Task[]) => {
        response.status(200).json(tasks);
    }

    export const TaskFound = (response: Response, task: Task) => {
        response.status(200).json(task);
    }
}
