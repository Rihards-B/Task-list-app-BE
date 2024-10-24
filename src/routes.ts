import { Router } from 'express';
import { taskRoutes } from './routes/TaskRoutes';
import { userRoutes } from './routes/UserRoutes';
import { authRoutes } from './routes/AuthRoutes';

export const routes = Router();

// All of the routes from different route files go here
routes.use("/tasks", taskRoutes);
routes.use("/users", userRoutes);
routes.use("/auth", authRoutes);
