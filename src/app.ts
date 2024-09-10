import express, { Express, json, Request, Response } from "express";
import { TaskModel } from "./models/Task";
import { routes } from "./routes";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser"
export const app: Express = express();

dotenv.config();

const allowedOrigins = ['http://localhost:4200', 'http://localhost:3131'];
const options: cors.CorsOptions = {
    origin: allowedOrigins,
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
};

app.use(json());
app.use(cors(options));
app.use(cookieParser());
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


