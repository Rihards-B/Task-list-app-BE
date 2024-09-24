import { Schema, model } from 'mongoose';
import { Role } from './Role';

// 1. Create an interface representing a document in MongoDB.
export interface User {
    _id?: string,
    username: string,
    password: string,
    first_name: string,
    last_name: string,
    roles: Role[]
}

// 2. Create a Schema corresponding to the document interface.
const userSchema = new Schema<User>({
    username: { type: String, required: true },
    password: { type: String, required: true },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    roles: { type: Schema.Types.Mixed, required: true }
});

// 3. Create a Model.
export const UserModel = model<User>('User', userSchema);