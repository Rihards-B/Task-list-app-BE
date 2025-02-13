import { CreateTaskUniqueTitleValidator } from "./createTaskUniqueTitleValidator";
import { GroupsExistsValidator } from "./groupsExistsValidator";

export const CreateTaskValidationSchema = {
    title: {
        isString: {
            errorMessage: "Title must be a string"
        },
        notEmpty: {
            errorMessage: "Title cannot be empty"
        },
        custom: {
            options: CreateTaskUniqueTitleValidator
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
            options: GroupsExistsValidator
        }
    }
}