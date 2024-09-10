export const AuthValidationSchema = {
    authJWT: {
        exists: {
            errorMessage: "A JWT must be provided"
        },
        notEmpty: {
            errorMessage: "JWT cannot be empty"
        },
        isJWT: {
            errorMessage: "The passed in value is not a valid JWT"
        }
    }
}