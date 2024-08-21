import express, { Express, Request, Response } from "express";
import { TaskModel } from "./models/Task";
import { routes } from "./routes";
import cors from "cors";
export const app: Express = express();

const allowedOrigins = ['http://localhost:3131', 'http://localhost:4200'];

const options: cors.CorsOptions = {
    origin: allowedOrigins
};

app.use(cors());
app.use(routes);

// An example route for testing if the server works
app.get('/example', (req: Request, res: Response) => {
    res.send('Example get response');
});

// test route to check if initialization works
app.get('/tasks', async (req: Request, res: Response) => {
    const result = await TaskModel.find()
    res.json(result);
})


