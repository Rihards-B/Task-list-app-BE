import { Request, Response } from "express";
import { BaseEndpoint } from "./BaseController";
import { GroupModel } from "../models/Group";
import { GroupResponses } from "../responses/GroupResponses";

export const getGroups = BaseEndpoint(async (req: Request, res: Response) => {
    const groups = await GroupModel.find();
    GroupResponses.GroupsFound(res, groups.map(group => group.name));
})