import { Router } from "express";
import { getRoles } from "../controllers/RoleController";

export const roleRoutes = Router();

roleRoutes.use("/", getRoles);