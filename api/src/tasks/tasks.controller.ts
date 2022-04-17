import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Public } from 'src/auth/guards/publicDecorator';
import { Headers } from '@nestjs/common';
import { CaslAbilityFactory } from 'src/casl/casl-ability.factory';
import { UsersService } from 'src/users/users.service';

@Controller('tasks')
export class TasksController {
  constructor(
    private readonly tasksService: TasksService,
  ) { }

  @Public()
  @Post()
  async addTask(
    @Body('name') name: string,
    @Body('completed') completed: boolean,
    @Body('skills') skills: Array<any>,
    @Request() request: any,
  ) {

    const userId = request.user

    const generatedId = await this.tasksService.insertTask(
      name,
      completed,
      skills,
      userId
    );

    return { userId }
  }

  @Public()
  @Get()
  async getAllTasks() {
    const tasks = await this.tasksService.getTasks();
    return tasks
  }

  @Public()
  @Get(':id')
  async getTask(@Param('id') id: string) {
    const task = await this.tasksService.getSingleTask(id);
    return task
  }

  @Public()
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

  @Public()
  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.tasksService.deleteProduct(id);
    return id
  }
}
