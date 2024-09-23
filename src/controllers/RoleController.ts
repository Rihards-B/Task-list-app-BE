import { Request, Response } from "express"
import { BaseEndpoint } from "./BaseController"
import { RoleModel } from "../models/Role"
import { RoleResponses } from "../responses/RoleResponses";

export const getRoles = BaseEndpoint(async (req: Request, res: Response) => {
    const roles = await RoleModel.find();
    RoleResponses.RolesFound(res, roles);
})