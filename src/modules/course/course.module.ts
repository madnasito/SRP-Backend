import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from './entity/course.entity';
import { Lesson } from './entity/lesson.entity';
import { UserLessonProgress } from './entity/user-lesson-progress.entity';
import { Category } from './entity/category.entity';
import { Module } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseController } from './course.controller';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([Course, Lesson, UserLessonProgress, Category]),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          secret: config.get<string>('JWT_SECRET'),
          signOptions: { expiresIn: '10d' },
        };
      },
    }),
  ],
  providers: [CourseService, CategoryService],
  controllers: [CourseController, CategoryController],
})
export class CourseModule {}
