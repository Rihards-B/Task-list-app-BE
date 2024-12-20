import { RoleModel } from "../models/Role";
import { TaskModel } from "../models/Task";
import { UserModel } from "../models/User";
import tasksJson from "./dummy-tasks.json";
import usersJson from "./dummy-users.json";
import rolesJson from "./dummy-roles.json";
import groupsJson from "./dummy-groups.json";
import { GroupModel } from "../models/Group";

export const initialize = async () => {
    //const tasks: Task[] = tasksJson;
    console.log("Running initialize!");
    try {
        console.log("Dropping roles table");
        await RoleModel.deleteMany();
        console.log("Creating roles");
        await RoleModel.create(rolesJson);

        console.log("Dropping groups table!");
        await GroupModel.deleteMany();
        console.log("Creating groups");
        await GroupModel.create(groupsJson);

        console.log("Dropping users table!");
        await UserModel.deleteMany();
        console.log("Creating users");
        await UserModel.create(usersJson);

        console.log("Dropping tasks table!");
        await TaskModel.deleteMany();
        console.log("Creating dummy tasks");
        await TaskModel.create(tasksJson);
    } catch (error) {
        console.log("Initialization failed: ", error);
    }
    console.log("Initialization finished!");
}

