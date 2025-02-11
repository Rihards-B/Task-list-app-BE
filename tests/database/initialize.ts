import { RoleModel } from "../../src/models/Role";
import { TaskModel } from "../../src/models/Task";
import { UserModel } from "../../src/models/User";
import { GroupModel } from "../../src/models/Group";
import tasksJson from "./dummy-tasks.json";
import usersJson from "./dummy-users.json";
import rolesJson from "./dummy-roles.json";
import groupsJson from "./dummy-groups.json";

export const initialize = async () => {
    try {
        await RoleModel.deleteMany();
        await RoleModel.create(rolesJson);

        await GroupModel.deleteMany();
        await GroupModel.create(groupsJson);

        await UserModel.deleteMany();
        await UserModel.create(usersJson);

        await TaskModel.deleteMany();
        await TaskModel.create(tasksJson);
    } catch (error) {
        console.log("Initialization failed: ", error);
    }
}

