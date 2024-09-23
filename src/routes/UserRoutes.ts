import { Router } from 'express';
import { getUsers, getUser, currentUser } from '../controllers/UserController';
import { checkSchema } from 'express-validator';
import { AuthValidationSchema } from '../validators/authValidationSchema';
import { validateToken } from '../middleware/auth/validateToken';

export const userRoutes = Router();

userRoutes.get("/", getUsers);
userRoutes.get("/current", checkSchema(AuthValidationSchema), validateToken, currentUser);
userRoutes.get("/:id", getUser);
