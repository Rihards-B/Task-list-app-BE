import { model, Schema } from "mongoose";

export interface Role {
    _id?: string,
    role_name: string
}

const roleSchema = new Schema<Role>({
    role_name: { type: String, required: true },
});

export const RoleModel = model<Role>('Role', roleSchema);