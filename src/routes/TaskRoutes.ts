import { Router } from 'express';
import { createTask, deleteTask, getTask, getTasks, updateTask } from '../controllers/TaskController';
import { validateToken } from '../middleware/auth/validateToken';
import { checkSchema } from 'express-validator';
import { AuthValidationSchema } from '../validators/authValidationSchema';

export const taskRoutes = Router();

taskRoutes.get("/", checkSchema(AuthValidationSchema), validateToken(), getTasks);
taskRoutes.get('/:id', checkSchema(AuthValidationSchema), validateToken(), getTask);
taskRoutes.post('/', createTask);
taskRoutes.delete('/:id', deleteTask);
taskRoutes.put('/', updateTask);
