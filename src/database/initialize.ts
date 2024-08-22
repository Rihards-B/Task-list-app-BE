import { TaskModel } from "../models/Task";
import { UserModel } from "../models/User";
import tasksJson from "./dummy-tasks.json";
import usersJson from "./dummy-users.json";

export const initialize = async () => {
    //const tasks: Task[] = tasksJson;
    console.log("Running initialize!");
    try {
        console.log("Dropping tasks table!");
        await TaskModel.deleteMany();
        console.log("Creating dummy tasks");
        await TaskModel.create(tasksJson);
        console.log("Creating users");
        await UserModel.create(usersJson);
    } catch (error) {
        console.log("Initialization failed: ", error);
    }
    console.log("Initialization finished!");
}

