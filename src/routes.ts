import { Router } from 'express';
import { taskRoutes } from './routes/TaskRoutes';

export const routes = Router();

// All of the routes from different route files go here
routes.use(taskRoutes);
