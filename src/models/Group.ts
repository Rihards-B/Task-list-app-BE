import { model, Schema } from "mongoose";

export interface Group {
    name: string
}

const groupSchema = new Schema<Group>({
    name: { type: String, required: true, unique: true },
});

export const GroupModel = model<Group>('Group', groupSchema);