import * as mongoose from 'mongoose'

export const TaskSchema = new mongoose.Schema({
    name: { type: String, required: true },
    completed: { type: Boolean, required: true },
    skills: { type: Array, required: false },
    owners: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    ownerId: { type: String, required: false }
})

export interface Task extends mongoose.Document {
    id: string,
    name: string;
    completed: boolean;
    skills: Array<any>;
    owners: Array<any>;
    ownerId: string
}