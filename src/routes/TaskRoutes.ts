import { json, Router } from 'express';
import { createTask, getTask } from '../controllers/TaskController';

export const taskRoutes = Router();

taskRoutes.use(json());

taskRoutes.get('/:id', getTask);
taskRoutes.post('/', createTask);
