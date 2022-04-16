import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './tasks/tasks.module';
import { SkillsModule } from './skills/skills.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { JwtAuthGuard } from './roles.guard';
import { APP_GUARD } from '@nestjs/core';

@Module({
  controllers: [AppController],
  providers: [AppService, {
    provide: APP_GUARD,
    useClass: JwtAuthGuard,
  }],
  imports: [TasksModule, SkillsModule, UsersModule, MongooseModule.forRoot('mongodb+srv://admin:generate.Sales24@tasks.cgbe0.mongodb.net/Tasks?retryWrites=true&w=majority'), AuthModule, UsersModule],
})
export class AppModule { }
