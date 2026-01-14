import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Course } from './entity/course.entity';
import { Repository } from 'typeorm';
import { CreateCourseDto } from './dto/create-course.dto';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { Lesson } from './entity/lesson.entity';

@Injectable()
export class CourseService {
    constructor(
        @InjectRepository(Course)
        private readonly courseRepository: Repository<Course>,
        @InjectRepository(Lesson)
        private readonly lessonRepository: Repository<Lesson>,
    ) {}

    createCourse(data: CreateCourseDto): Promise<Course> {
        const course = this.courseRepository.create(data);
        return this.courseRepository.save(course);
    }

    async createLesson(data: CreateLessonDto): Promise<Lesson> {

        const course = await this.courseRepository.findOne({ where: { id: data.course } });
        
        if(!course) {
            throw new NotFoundException('Curso no encontrado');
        }
        const lesson = this.lessonRepository.create({
            ...data,
            course: { id: data.course }
        });
        return this.lessonRepository.save(lesson);
    }

    findCourseWithLessons(id: number) {
        return this.courseRepository.findOne({ where: { id }, relations: ['lessons'] });
    }

    findAllCourses(): Promise<Course[]> {
        return this.courseRepository.find();
    }

    findAllLessons(): Promise<Lesson[]> {
        return this.lessonRepository.find();
    }
}
