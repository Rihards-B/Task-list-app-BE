import { Router } from "express";
import { getGroups } from "../controllers/GroupsController";
import { validateToken } from "../middleware/auth/validateToken";

export const groupRoutes = Router();

groupRoutes.use("/", validateToken(["Admin", "Manager"]), getGroups);