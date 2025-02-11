import { Group, GroupModel } from "../models/Group";
import { EditTaskUniqueTitleValidator } from "./editTaskUniqueTitleValidator";

export const EditTaskValidationSchema = {
    _id: {
        isString: {
            errorMessage: "_id must be a string"
        },
        notEmpty: {
            errorMessage: "Title cannot be empty"
        },
    },
    title: {
        isString: {
            errorMessage: "Title must be a string"
        },
        notEmpty: {
            errorMessage: "Title cannot be empty"
        },
        custom: {
            options: EditTaskUniqueTitleValidator
        },
    },
    status: {
        notEmpty: {
            errorMessage: "Status cannot be empty"
        },
        isIn: {
            options: [["incomplete", "complete"]],
            errorMessage: "Status has to be 'Incomplete' or 'Complete'"
        }
    },
    type: {
        notEmpty: {
            errorMessage: "Type cannot be empty"
        },
        isIn: {
            options: [["Story", "Task"]],
            errorMessage: "Type has to be 'Story' or 'Task'"
        }
    },
    groups: {
        custom: {
            options: async (value: string[]) => {
                const backendGroups: Group[] = await GroupModel.find();
                value.forEach(group => {
                    if (!backendGroups.find(backendGroup => backendGroup.name === group)) {
                        throw new Error('Group ' + group + ' does not exist');
                    }
                })
            }
        }
    }
}