import * as mongoose from 'mongoose'

export const UserSchema = new mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    tasks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task'
    }]
})

export interface User extends mongoose.Document {
    email: string,
    password: string;
    tasks: Array<any>
}