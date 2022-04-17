import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TasksModule } from './tasks/tasks.module';
import { SkillsModule } from './skills/skills.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { CaslModule } from './casl/casl.module';

@Module({
  controllers: [AppController],
  providers: [{
    provide: APP_GUARD,
    useClass: JwtAuthGuard,
  }],
  imports: [TasksModule, SkillsModule, UsersModule, MongooseModule.forRoot('mongodb+srv://admin:generate.Sales24@tasks.cgbe0.mongodb.net/Tasks?retryWrites=true&w=majority'), AuthModule, UsersModule, CaslModule],
})
export class AppModule { }
