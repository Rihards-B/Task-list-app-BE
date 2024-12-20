import { Router } from "express";
import { getRoles } from "../controllers/RoleController";
import { validateToken } from "../middleware/auth/validateToken";

export const roleRoutes = Router();

roleRoutes.use("/", validateToken(["Adming", "Manager"]), getRoles);