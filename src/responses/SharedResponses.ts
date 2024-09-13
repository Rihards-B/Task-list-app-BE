import { Response } from "express";

export namespace SharedResponses {
    export const InternalServerError = (response: Response) => {
        response.status(500).json({ "Message": "Server error" });
    }

    export const InvalidTaskID = (response: Response, id: string) => {
        response.status(400).json({ "Message": "Invalid ID format: " + id + " !" });
    }
}
