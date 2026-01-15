import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from './entity/course.entity';
import { Lesson } from './entity/lesson.entity';
import { UserLessonProgress } from './entity/user-lesson-progress.entity';
import { Module } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseController } from './course.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';


@Module({
  imports: [
    TypeOrmModule.forFeature([Course, Lesson, UserLessonProgress]),
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
  providers: [CourseService],
  controllers: [CourseController],
})
export class CourseModule {}
