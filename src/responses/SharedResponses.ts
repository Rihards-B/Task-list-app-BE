import { Response } from "express";
import { ValidationError } from "express-validator";

export namespace SharedResponses {
    export const InternalServerError = (response: Response) => {
        response.status(500).json({ "Message": "Server error" });
    }

    export const InvalidTaskID = (response: Response, id: string) => {
        response.status(400).json({ "Message": "Invalid ID format: " + id + " !" });
    }

    export const ValidationError = (response: Response, errors: ValidationError[]) => {
        response.status(400).json(errors);
    }
}
