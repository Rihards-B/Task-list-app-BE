import { json, Router } from 'express';
import { createTask, getTask, getTasks } from '../controllers/TaskController';

export const taskRoutes = Router();

taskRoutes.use(json());

taskRoutes.get("/", getTasks);
taskRoutes.get('/:id', getTask);
taskRoutes.post('/', createTask);
