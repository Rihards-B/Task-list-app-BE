import { ObjectId, Schema, model } from 'mongoose';

// 1. Create an interface representing a document in MongoDB.
export interface User {
    _id: string,
    username: string,
    password: string,
    first_name: string,
    last_name: string
}

// 2. Create a Schema corresponding to the document interface.
const userSchema = new Schema<User>({
    _id: Schema.Types.ObjectId,
    username: { type: String, required: true },
    password: { type: String, required: true },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true }
});

// 3. Create a Model.
export const UserModel = model<User>('User', userSchema);