import { Router } from 'express';
import { checkSchema } from 'express-validator';
import { LoginValidationSchema } from '../validators/loginValidationSchema';
import { login, logout } from '../controllers/AuthController'

export const authRoutes = Router();

authRoutes.post("/login", checkSchema(LoginValidationSchema), login);
authRoutes.get("/logout", logout);