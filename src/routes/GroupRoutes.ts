import { Router } from "express";
import { createGroup, deleteGroup, getGroups, updateGroup } from "../controllers/GroupsController";
import { validateToken } from "../middleware/auth/validateToken";
import { check } from "express-validator";

export const groupRoutes = Router();

groupRoutes.get("/", validateToken(["Admin", "Manager"]), getGroups);
groupRoutes.post("/:groupName", check('groupName').exists().isString().notEmpty().isAlphanumeric(), validateToken(["Admin"]), createGroup);
groupRoutes.delete("/:groupName", check('groupName').exists().isString().notEmpty().isAlphanumeric(), validateToken(["Admin"]), deleteGroup);
groupRoutes.put("/:groupName/:newGroupName", check(['groupName', 'newGroupName']).exists().isString().notEmpty().isAlphanumeric(), validateToken(["Admin"]), updateGroup);