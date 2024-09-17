export const RegistrationValidationSchema = {
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
    password: {
        isString: {
            errorMessage: "Password must be a string"
        },
        notEmpty: {
            errorMessage: "Password cannot be empty"
        },
        isLength: {
            options: {
                min: 6,
                max: 64
            },
            errorMessage: "Password must be 6-64 characters long"
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
    }
}