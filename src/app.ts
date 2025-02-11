import express, { Express, json } from "express";
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

export default app