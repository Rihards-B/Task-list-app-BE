import { Request, Response } from "express";
import { BaseEndpoint } from "./BaseController";
import { Group, GroupModel } from "../models/Group";
import { GroupResponses } from "../responses/GroupResponses";
import { Error } from "mongoose";
import { GroupService } from "../services/GroupService";
import { matchedData } from "express-validator";
import { formatErrors } from "../database/formatErrors";
import { SharedResponses } from "../responses/SharedResponses";
import { MongoServerError } from "mongodb";

let groupService = new GroupService();

export const getGroups = BaseEndpoint(async (req: Request, res: Response) => {
    const groups = await GroupModel.find();
    GroupResponses.GroupsFound(res, groups.map(group => group.name));
})

export const createGroup = BaseEndpoint(async (req: Request, res: Response) => {
    let taskRes: Error.ValidationError | Group | null = null;
    let errors: { [key: string]: string } | null = null;
    const data = matchedData(req);
    try {
        taskRes = await groupService.createGroup(data.groupName);
    } catch (err) {
        // code 11000 is duplicate unique member
        if (err instanceof MongoServerError && err.code == 11000) {
            SharedResponses.CreationErrors(res, { Nessage: "A group with that name already exists" });
            return;
        } else {
            SharedResponses.InternalServerError(res);
            console.log(err);
        }
    }
    if (taskRes) {
        if (taskRes instanceof Error.ValidationError) {
            errors = formatErrors(taskRes);
            SharedResponses.CreationErrors(res, errors);
        } else {
            GroupResponses.GroupCreated(res, data.groupName);
        }
    } else {
        console.log("No result from group service");
        SharedResponses.InternalServerError(res);
    }
})

//  TODO: Delete group endpoint

//  TODOL Update group endpoint