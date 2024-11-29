import { Response } from "express";

export namespace RoleResponses {
    export const RolesFound = (response: Response, roles: string[]) => {
        response.status(200).json(roles);
    }
}