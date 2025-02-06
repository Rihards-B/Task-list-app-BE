import { ObjectId, Schema, model } from 'mongoose';

// 1. Create an interface representing a document in MongoDB.
export interface Task {
  _id: ObjectId | null;
  title: string;
  description?: string;
  createdOn?: Date;
  status: string;
  type: string;
  assignedTo?: string;
  groups?: string[];
}

// 2. Create a Schema corresponding to the document interface.
const taskSchema = new Schema<Task>({
  _id: Schema.Types.ObjectId,
  title: { type: String, required: true, unique: true },
  description: String,
  createdOn: Date,
  status: { type: String, required: true },
  type: { type: String, required: true },
  assignedTo: String,
  groups: [String]
});

// 3. Create a Model.
export const TaskModel = model<Task>('Task', taskSchema);