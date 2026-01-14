import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from './entity/course.entity';
import { Lesson } from './entity/lesson.entity';
import { Module } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseController } from './course.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Course, Lesson])],
  providers: [CourseService],
  controllers: [CourseController],
})
export class CourseModule {}
