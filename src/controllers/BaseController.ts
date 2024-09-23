import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { SharedResponses } from "../responses/SharedResponses";

export const BaseEndpoint = (doLogic: Function) => {
    return (req: Request, res: Response) => {
        try {
            const validationRes = validationResult(req);
            if (!validationRes.isEmpty()) {
                SharedResponses.ValidationError(res, validationRes.array());
                return;
            }
            doLogic(req, res);
        } catch (error) {
            console.log(error);
            SharedResponses.InternalServerError(res);
        }
    }
}
