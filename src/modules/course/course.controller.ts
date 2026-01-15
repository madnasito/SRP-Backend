import { Body, Controller, Get, Param, Post, Query, UseGuards, Req } from '@nestjs/common';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UserAdminGuard } from 'src/common/guards/user-admin.guard';
import { UserGuard } from 'src/common/guards/user.guard';

@Controller('course')
export class CourseController {
    constructor(
        private readonly courseService: CourseService,
    ) {}

    @UseGuards(UserAdminGuard)
    @Post('create-course')
    createCourse(@Body() data: CreateCourseDto) {
        return this.courseService.createCourse(data);
    }

    @Post('create-lesson')
    createLesson(@Body() data: CreateLessonDto) {
        return this.courseService.createLesson(data);
    }

    @Get('all-courses')
    findAllCourses() {
        return this.courseService.findAllCourses();
    }

    @Get('all-lessons')
    findAllLessons() {
        return this.courseService.findAllLessons();
    }

    @Get('with-lessons')
    findCourseWithLessons(@Query('id') id: number) {
        return this.courseService.findCourseWithLessons(id);
    }

    @UseGuards(UserGuard)
    @Post(':courseId/lessons/:lessonId/complete')
    completeLesson(
        @Req() req,
        @Param('courseId') courseId: number,
        @Param('lessonId') lessonId: number
    ) {
        const userId = req['id'].id;
        return this.courseService.markLessonAsCompleted(userId, lessonId);
    }

    @UseGuards(UserGuard)
    @Get(':courseId/progress')
    getProgress(
        @Req() req,
        @Param('courseId') courseId: number
    ) {
        const userId = req['id'].id;
        return this.courseService.getUserCourseProgress(userId, courseId);
    }
}
