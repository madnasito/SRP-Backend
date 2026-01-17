import { Body, Controller, Get, Param, Post, Query, UseGuards, Req, Delete, Patch } from '@nestjs/common';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UserAdminGuard } from 'src/common/guards/user-admin.guard';
import { UserGuard } from 'src/common/guards/user.guard';
import { EditCourseDto } from './dto/edit-course.dto';

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

    @UseGuards(UserAdminGuard)
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
    @Get('my-progress')
    getUserAllCoursesProgress(@Req() req: any) {
        const userId = req.user.id;
        return this.courseService.getUserAllCoursesProgress(userId);
    }

    @UseGuards(UserGuard)
    @Get('complete-lesson/:courseId/:lessonId')
    completeLesson(
        @Req() req: any,
        @Param('lessonId') lessonId: number
    ) {
        const userId = req.user.id;
        return this.courseService.markLessonAsCompleted(userId, lessonId);
    }

    @UseGuards(UserGuard)
    @Get(':courseId/progress')
    getProgress(
        @Req() req: any,
        @Param('course') courseId: number
    ) {
        const userId = req.user.id;
        return this.courseService.getUserCourseProgress(userId, courseId);
    }

    @UseGuards(UserAdminGuard)
    @Patch('edit-course')
    editCourse(@Body() data: EditCourseDto) {
        return this.courseService.editCourse(data);
    }

    @UseGuards(UserAdminGuard)
    @Delete('lesson/:id')
    deleteLesson(@Param('id') id: number) {
        return this.courseService.deleteLesson(id);
    }

    @UseGuards(UserAdminGuard)
    @Delete(':id')
    deleteCourse(@Param('id') id: number) {
        return this.courseService.deleteCourse(id);
    }
}
