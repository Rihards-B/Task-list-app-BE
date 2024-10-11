import { Router } from 'express';
import { checkSchema } from 'express-validator';
import { LoginValidationSchema } from '../validators/loginValidationSchema';
import { login, logout, register } from '../controllers/AuthController'
import { RegistrationValidationSchema } from '../validators/registrationValidationSchema'

export const authRoutes = Router();

authRoutes.post("/login", checkSchema(LoginValidationSchema), login);
authRoutes.post("/register", checkSchema(RegistrationValidationSchema), register);
authRoutes.get("/logout", logout);