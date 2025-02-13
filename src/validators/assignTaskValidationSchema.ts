import { GroupsExistsValidator } from "./groupsExistsValidator";
import { UserExistsValidator } from "./usernameExistsValidator";

export const AssignTaskValidationSchema = {
    _id: {
        exists: {
            errorMessage: "Must provide _id when updating assignments"
        },
        notEmpty: {
            errorMessage: "_id can't be empty"
        }
    },
    groups: {
        custom: {
            options: GroupsExistsValidator
        }
    },
    assignedTo: {
        custom: {
            options: UserExistsValidator
        }
    }
} 