import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose'
import { Task } from './task.module';

@Injectable()
export class TasksService {

  constructor(@InjectModel('Task') private readonly taskModule: Model<Task>) { }

  async insertTask(name: string, completed: boolean, skills: Array<any>) {
    const newTask = new this.taskModule({ name: name, completed: completed, skills: skills })
    const result = await newTask.save()
    return result.id as string;
  }

  async getTasks() {
    const tasks = await this.taskModule.find().exec()
    return tasks.map((task) => ({ id: task.id, name: task.name, skills: task.skills }))
  }

  async getSingleTask(id: string) {
    let task;
    try {
      task = await this.taskModule.findById(id).exec()
    } catch (error) {
      throw new NotFoundException('Could not find task')
    }

    if (!task) {
      throw new NotFoundException('Could not find task')
    }

    return { id: task.id, name: task.name, skills: task.skills }

  }

  async updateTask(id: string, name: string, completed: boolean, skills: Array<any>) {
    const updatedTask = await this.taskModule.findById(id).exec()
    if (name) {
      updatedTask.name = name
    }
    if (completed) {
      updatedTask.completed = completed
    }
    if (skills) {
      updatedTask.skills = skills
    }
    updatedTask.save()
  }

  async deleteProduct(id: string) {
    await this.taskModule.deleteOne({ _id: id }).exec();
    return id
  }
}