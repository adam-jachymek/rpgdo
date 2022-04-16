import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SkillsService } from './skills.service';

@Controller('skills')
export class SkillsController {
  constructor(private readonly skillsService: SkillsService) { }

  @Post()
  async addSkill(
    @Body('name') name: string,
  ) {
    const exp = 0
    const level = 1
    const maxExp = 1000
    const taskCompleted = 0
    const generatedId = await this.skillsService.insertSkill(
      name,
      level,
      exp,
      maxExp,
      taskCompleted
    );
    return { id: generatedId }
  }

  @Get()
  async getAllSkills() {
    const skills = await this.skillsService.getSkills();
    return skills
  }

  @Get(':id')
  async getSkill(@Param('id') id: string) {
    const skill = await this.skillsService.getSingleSkill(id);
    return skill
  }

  @Patch(':id')
  async updateSkill(
    @Param('id') id: string,
  ) {
    const skill = await this.skillsService.getSingleSkill(id);
    const name = skill.name
    const newExp = skill.exp + 400

    const newTasksCount = skill.tasksCompleted + 1

    if (newExp >= skill.maxExp) {
      const newLevel = skill.level + 1
      const newMaxEpx = 1000 * newLevel
      const baseExp = 200

      await this.skillsService.updateSkill(id, name, baseExp, newLevel, newMaxEpx, newTasksCount)
    } else {
      await this.skillsService.updateSkill(id, name, newExp, skill.level, skill.maxExp, newTasksCount)
    }
    return id;
  }

  @Patch('/name/:id')
  async updateSkillName(
    @Param('id') id: string,
    @Body('name') name: string,
  ) {
    await this.skillsService.updateSkillName(id, name)
    return id;
  }


  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.skillsService.deleteSkill(id);
    return id
  }
}
