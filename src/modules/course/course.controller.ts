import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { CreateLessonDto } from './dto/create-lesson.dto';

@Controller('course')
export class CourseController {
    constructor(
        private readonly courseService: CourseService,
    ) {}

    @Post()
    createCourse(@Body() data: CreateCourseDto) {
        return this.courseService.createCourse(data);
    }

    @Post()
    createLesson(@Body() data: CreateLessonDto) {
        return this.courseService.createLesson(data);
    }

    @Get()
    findAllCourses() {
        return this.courseService.findAllCourses();
    }

    @Get()
    findAllLessons() {
        return this.courseService.findAllLessons();
    }

    @Get()
    findCourseWithLessons(@Param('id') id: number) {
        return this.courseService.findCourseWithLessons(id);
    }
}
