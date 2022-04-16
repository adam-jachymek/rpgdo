import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Public } from 'src/publicDecorator';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) { }

  @Post()
  async addTask(
    @Body('name') name: string,
    @Body('completed') completed: boolean,
    @Body('skills') skills: Array<any>
  ) {
    const generatedId = await this.tasksService.insertTask(
      name,
      completed,
      skills
    );
    return { id: generatedId }
  }

  @Public()
  @Get()
  async getAllTasks() {
    const products = await this.tasksService.getTasks();
    return products
  }

  @Get(':id')
  async getTask(@Param('id') id: string) {
    const task = await this.tasksService.getSingleTask(id);
    return task
  }

  @Patch(':id')
  async updateTask(
    @Param('id') id: string,
    @Body('name') name: string,
    @Body('completed') completed: boolean,
    @Body('skills') skills: Array<any>
  ) {
    await this.tasksService.updateTask(id, name, completed, skills)
    return id;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.tasksService.deleteProduct(id);
    return id
  }
}
