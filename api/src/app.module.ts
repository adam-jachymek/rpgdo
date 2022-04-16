import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './tasks/tasks.module';
import { SkillsModule } from './skills/skills.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [TasksModule, SkillsModule, MongooseModule.forRoot('mongodb+srv://admin:generate.Sales24@tasks.cgbe0.mongodb.net/Tasks?retryWrites=true&w=majority')],
})
export class AppModule { }
