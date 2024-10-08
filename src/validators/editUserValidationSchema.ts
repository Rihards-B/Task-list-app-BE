import { isObjectIdOrHexString } from "mongoose";

export const EditUserValidationSchema = {
    username: {
        isString: {
            errorMessage: "Username must be a string"
        },
        notEmpty: {
            errorMessage: "Username cannot be empty"
        },
        isLength: {
            options: {
                min: 4,
                max: 24
            },
            errorMessage: "Username must be 4-24 characters long"
        }
    },
    first_name: {
        isString: {
            errorMessage: "First name must be a string"
        },
        notEmpty: {
            errorMessage: "First name cannot be empty"
        },
        isLength: {
            options: {
                max: 64
            },
            errorMessage: "First name must be less than 64 characters long"
        }
    },
    last_name: {
        isString: {
            errorMessage: "Last name must be a string"
        },
        notEmpty: {
            errorMessage: "Last name cannot be empty"
        },
        isLength: {
            options: {
                max: 64
            },
            errorMessage: "Last name must be less than 64 characters long"
        }
    },
    roles: {
        isArray: {
            options: {
                min: 1
            },
            errorMessage: "Roles must be in an array form and can't be empty"
        },
        notEmpty: {
            errorMessage: "Roles cannot be empty"
        },
    },
    'roles.*.role_name': {
        notEmpty: {
            errorMessage: "Role must have a name"
        },
        isString: {
            errorMessage: "Role name must be a string"
        }
    },
    'roles.*._id': {
        notEmpty: {
            errorMessage: "Role must have an _id"
        },
        isMongoId: {
            errorMessage: "Invalid _id format"
        }
    }
}