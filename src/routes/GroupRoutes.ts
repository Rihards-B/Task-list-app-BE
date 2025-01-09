import { Router } from "express";
import { createGroup, getGroups } from "../controllers/GroupsController";
import { validateToken } from "../middleware/auth/validateToken";
import { check } from "express-validator";

export const groupRoutes = Router();

groupRoutes.get("/", validateToken(["Admin", "Manager"]), getGroups);
groupRoutes.post("/:groupName", check('groupName').exists().isString().notEmpty().isAlphanumeric(), validateToken(["Admin"]), createGroup);