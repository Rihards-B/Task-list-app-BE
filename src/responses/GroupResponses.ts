import { Response } from "express";

export namespace GroupResponses {
    export const GroupsFound = (response: Response, groups: string[]) => {
        response.status(200).json(groups);
    }

    export const GroupCreated = (response: Response, group: string) => {
        response.status(200).json(group);
    }

    export const GroupDeleted = (response: Response, group: string) => {
        response.status(200).json(group);
    }

    export const GroupUpdated = (response: Response, newGroupName: string) => {
        response.status(200).json(newGroupName);
    }

    export const GroupNotFound = (response: Response, group: string) => {
        response.status(400).json(
            {
                "messages": [
                    "Group with name " + group + " does not exist"
                ]
            })
    }
}