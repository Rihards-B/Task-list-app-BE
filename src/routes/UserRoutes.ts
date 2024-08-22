import { json, Router } from 'express';
import { getUsers, getUser } from '../controllers/UserController';

export const userRoutes = Router();

userRoutes.use(json());

userRoutes.get("/", getUsers);
userRoutes.get("/:id", getUser);