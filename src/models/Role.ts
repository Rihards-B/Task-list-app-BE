import { model, Schema } from "mongoose";

export interface Role {
    name: string
}

const roleSchema = new Schema<Role>({
    name: { type: String, required: true, unique: true },
});

export const RoleModel = model<Role>('Role', roleSchema);