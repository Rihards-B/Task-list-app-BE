import { Schema, model } from 'mongoose';
import { Role } from './Role';

// 1. Create an interface representing a document in MongoDB.
export interface User {
    _id?: string,
    username: string,
    password: string,
    firstName: string,
    lastName: string,
    roles: Role[]
}

// 2. Create a Schema corresponding to the document interface.
const userSchema = new Schema<User>({
    username: { type: String, required: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    roles: { type: Schema.Types.Mixed, required: true }
});

// 3. Create a Model.
export const UserModel = model<User>('User', userSchema);