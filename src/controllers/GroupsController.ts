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
import { UserModel } from "../models/User";

let groupService = new GroupService();

export const getGroups = BaseEndpoint(async (req: Request, res: Response) => {
    const groups = await GroupModel.find();
    GroupResponses.GroupsFound(res, groups.map(group => group.name));
})

export const createGroup = BaseEndpoint(async (req: Request, res: Response) => {
    let result: Error.ValidationError | Group | null = null;
    let errors: { [key: string]: string } | null = null;
    const data = matchedData(req);
    try {
        result = await groupService.createGroup(data.groupName);
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
    if (result) {
        if (result instanceof Error.ValidationError) {
            errors = formatErrors(result);
            SharedResponses.CreationErrors(res, errors);
        } else {
            GroupResponses.GroupCreated(res, data.groupName);
        }
    } else {
        console.log("No result from group service");
        SharedResponses.InternalServerError(res);
    }
})

export const deleteGroup = BaseEndpoint(async (req: Request, res: Response) => {
    const data = matchedData(req);
    const result = await GroupModel.findOneAndDelete({ name: data.groupName });
    if (result) {
        await UserModel.updateMany({ groups: { $in: [data.groupName] } }, { $pull: { groups: { $in: [data.groupName] } } });
        GroupResponses.GroupDeleted(res, data.groupName);
    } else {
        GroupResponses.GroupNotFound(res, data.groupName);
    }
})

export const updateGroup = BaseEndpoint(async (req: Request, res: Response) => {
    let result: Error.ValidationError | Group | null = null;

    const data = matchedData(req);

    try {
        result = await GroupModel.findOneAndUpdate({ name: data.groupName }, { name: data.newGroupName });
        await UserModel.updateMany({ groups: { $in: [data.groupName] } }, { $set: { "groups.$": data.newGroupName } });
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

    if (result) {
        GroupResponses.GroupUpdated(res, data.newGroupName);
    } else {
        GroupResponses.GroupNotFound(res, data.groupName);
    }
})