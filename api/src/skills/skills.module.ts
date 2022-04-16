import { Module } from '@nestjs/common';
import { SkillsService } from './skills.service';
import { SkillsController } from './skills.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { SkillSchema } from './skill.module';


@Module({
  imports: [MongooseModule.forFeature([{ name: 'Skill', schema: SkillSchema }])],
  controllers: [SkillsController],
  providers: [SkillsService]
})
export class SkillsModule { }
