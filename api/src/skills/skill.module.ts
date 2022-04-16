import * as mongoose from 'mongoose'

export const SkillSchema = new mongoose.Schema({
    name: { type: String, required: true },
    level: { type: Number, required: true },
    exp: { type: Number, required: true },
    maxExp: { type: Number, required: true },
    tasksCompleted: { type: Number, required: true },
})

export interface Skill extends mongoose.Document {
    id: string,
    name: string;
    exp: number;
    level: number;
    maxExp: number;
    tasksCompleted: number;
}