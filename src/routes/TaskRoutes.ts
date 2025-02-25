import { Router } from 'express';
import { createTask, deleteTask, getTask, getTasks, updateTask, updateTaskAssignment } from '../controllers/TaskController';
import { validateToken } from '../middleware/auth/validateToken';
import { checkSchema } from 'express-validator';
import { AuthValidationSchema } from '../validators/authValidationSchema';
import { EditTaskValidationSchema } from '../validators/editTaskValidationSchema';
import { CreateTaskValidationSchema } from '../validators/createTaskValidationSchema';
import { AssignTaskValidationSchema } from '../validators/assignTaskValidationSchema';

export const taskRoutes = Router();

taskRoutes.get("/", checkSchema(AuthValidationSchema), validateToken(), getTasks);
taskRoutes.get('/:id', checkSchema(AuthValidationSchema), validateToken(), getTask);
taskRoutes.post('/', checkSchema(CreateTaskValidationSchema), createTask);
taskRoutes.delete('/:id', deleteTask);
taskRoutes.put('/', checkSchema(EditTaskValidationSchema), updateTask);
taskRoutes.put('/assign', checkSchema(AssignTaskValidationSchema), validateToken(["Manager"]), updateTaskAssignment)
