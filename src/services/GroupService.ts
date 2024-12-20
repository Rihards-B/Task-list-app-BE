import { GroupModel } from "../models/Group";

export class GroupService {
    public async createGroup(groupName: string) {
        return await GroupModel.create({ name: groupName });
    }
}