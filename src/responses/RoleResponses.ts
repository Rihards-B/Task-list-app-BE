import { Response } from "express";
import { Role } from "../models/Role";

export namespace RoleResponses {
    export const RolesFound = (response: Response, roles: Role[]) => {
        response.status(200).json(roles);
    }
}