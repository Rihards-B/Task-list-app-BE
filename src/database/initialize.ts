import { TaskModel } from "../models/Task";
import tasksJson from "./dummy-tasks.json";

export const initialize = async () => {
    //const tasks: Task[] = tasksJson;
    console.log("Running initialize!");
    try {
        console.log("Dropping tasks table!");
        await TaskModel.deleteMany();
        console.log("Creating dummy tasks");
        await TaskModel.create(tasksJson);
    } catch(error) {
        console.log("Initialization failed: ", error);
    }
    console.log("Initialization finished!");
}

