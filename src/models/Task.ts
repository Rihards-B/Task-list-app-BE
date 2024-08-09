import { Schema, model } from 'mongoose';

// 1. Create an interface representing a document in MongoDB.
export interface Task {
  title: string;
  description?: string;
  createdOn?: Date;
  status: string;
  type: string;
}

// 2. Create a Schema corresponding to the document interface.
const taskSchema = new Schema<Task>({
  title: { type: String, required: true },
  description: String,
  createdOn: Date,
  status: { type: String, required: true },
  type: { type: String, required: true },
});

// 3. Create a Model.
export const TaskModel = model<Task>('Task', taskSchema);