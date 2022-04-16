import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose'
import { Skill } from './skill.module';

@Injectable()
export class SkillsService {

  constructor(@InjectModel('Skill') private readonly skillModule: Model<Skill>) { }

  async insertSkill(
    name: string,
    level: number,
    exp: number,
    maxExp: number,
    tasksCompleted: number
  ) {
    const newSkill = new this.skillModule({
      name: name,
      level: level,
      exp: exp,
      maxExp: maxExp,
      tasksCompleted: tasksCompleted
    })
    const result = await newSkill.save()
    return result.id as string;
  }

  async getSkills() {
    const skills = await this.skillModule.find().exec()
    return skills
  }

  async getSingleSkill(id: string) {
    let skill;
    try {
      skill = await this.skillModule.findById(id).exec()
    } catch (error) {
      throw new NotFoundException('Could not find task')
    }

    if (!skill) {
      throw new NotFoundException('Could not find task')
    }

    return { id: skill.id, name: skill.name, level: skill.level, exp: skill.exp, maxExp: skill.maxExp, tasksCompleted: skill.tasksCompleted }

  }

  async updateSkill(
    id: string,
    name: string,
    exp: number,
    level: number,
    maxExp: number,
    tasksCompleted: number
  ) {
    const updatedSkill = await this.skillModule.findById(id).exec()
    if (name) {
      updatedSkill.name = name
    }
    if (level) {
      updatedSkill.level = level
    }
    if (exp) {
      updatedSkill.exp = exp
    }
    if (maxExp) {
      updatedSkill.maxExp = maxExp
    }
    if (tasksCompleted) {
      updatedSkill.tasksCompleted = tasksCompleted
    }
    updatedSkill.save()
  }

  async updateSkillName(
    id: string,
    name: string,
  ) {
    const updatedSkill = await this.skillModule.findById(id).exec()
    if (name) {
      updatedSkill.name = name
    }
    updatedSkill.save()
  }

  async deleteSkill(id: string) {
    await this.skillModule.deleteOne({ _id: id }).exec();
    return id
  }
}