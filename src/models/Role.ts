import { model, Schema } from "mongoose";

export interface Role {
    roleName: string
}

const roleSchema = new Schema<Role>({
    roleName: { type: String, required: true, unique: true },
});

export const RoleModel = model<Role>('Role', roleSchema);