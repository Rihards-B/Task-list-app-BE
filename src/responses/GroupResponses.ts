import { Response } from "express";

export namespace GroupResponses {
    export const GroupsFound = (response: Response, groups: string[]) => {
        response.status(200).json(groups);
    }

    export const GroupCreated = (response: Response, group: string) => {
        response.status(200).json(group);
    }
}