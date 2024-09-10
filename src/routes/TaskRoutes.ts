import { json, Router } from 'express';
import { createTask, deleteTask, getTask, getTasks, updateTask } from '../controllers/TaskController';

export const taskRoutes = Router();

taskRoutes.use(json());

taskRoutes.get("/", getTasks);
taskRoutes.get('/:id', getTask);
taskRoutes.post('/', createTask);
taskRoutes.delete('/:id', deleteTask);
taskRoutes.put('/', updateTask);
