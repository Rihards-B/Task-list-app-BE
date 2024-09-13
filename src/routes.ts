import { Router } from 'express';
import { taskRoutes } from './routes/TaskRoutes';
import { userRoutes } from './routes/UserRoutes';

export const routes = Router();

// All of the routes from different route files go here
routes.use("/tasks", taskRoutes);
routes.use("/users", userRoutes);
