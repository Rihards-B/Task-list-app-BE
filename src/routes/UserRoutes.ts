import { Router } from 'express';
import { getUsers, getUser, currentUser, updateUser } from '../controllers/UserController';
import { checkSchema } from 'express-validator';
import { AuthValidationSchema } from '../validators/authValidationSchema';
import { validateToken } from '../middleware/auth/validateToken';
import { EditUserValidationSchema } from '../validators/editUserValidationSchema';

export const userRoutes = Router();

userRoutes.get("/", getUsers);
userRoutes.get("/current", checkSchema(AuthValidationSchema), validateToken(), currentUser);
userRoutes.get("/:id", validateToken("Admin"), getUser);
userRoutes.put("/:id", checkSchema(EditUserValidationSchema), validateToken("Admin"), updateUser);
