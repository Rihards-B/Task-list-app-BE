import { model, Schema } from "mongoose";

export interface Role {
    _id?: string,
    roleName: string
}

const roleSchema = new Schema<Role>({
    roleName: { type: String, required: true },
});

export const RoleModel = model<Role>('Role', roleSchema);