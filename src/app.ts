import express, { Express, Request, Response } from "express";
import { TaskModel } from "./models/Task";
export const app: Express = express();

// An example route for testing if the server works
app.get('/example', (req: Request, res: Response) => {
    res.send('Example get response');
});

// test route to check if initialization works
app.get('/tasks', async (req: Request, res: Response) => {
    const result = await TaskModel.find()
    res.json(result);
})


