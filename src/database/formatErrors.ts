import { Error } from "mongoose"

export const formatErrors = (validationErrors: Error.ValidationError) => {
        const errors: {[key: string]: string} = {};
        Object.keys(validationErrors.errors).forEach((error) => {
            errors[error] = validationErrors.errors[error].message;
        })
        return errors;
}