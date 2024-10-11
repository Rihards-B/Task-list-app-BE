export const LoginValidationSchema = {
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
    }
}