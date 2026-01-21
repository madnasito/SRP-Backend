import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Course } from './entity/course.entity';
import { Repository } from 'typeorm';
import { CreateCourseDto } from './dto/create-course.dto';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { Lesson } from './entity/lesson.entity';
import { UserLessonProgress } from './entity/user-lesson-progress.entity';
import { EditCourseDto } from './dto/edit-course.dto';

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
    @InjectRepository(Lesson)
    private readonly lessonRepository: Repository<Lesson>,
    @InjectRepository(UserLessonProgress)
    private readonly progressRepository: Repository<UserLessonProgress>,
  ) {}

  async createCourse(data: CreateCourseDto): Promise<Course> {
    const { categoryId, ...courseData } = data;
    const course = this.courseRepository.create({
      ...courseData,
      category: categoryId ? ({ id: categoryId } as any) : null,
    });
    return this.courseRepository.save(course);
  }

  async createLesson(data: CreateLessonDto): Promise<Lesson> {
    const course = await this.courseRepository.findOne({
      where: { id: data.course },
    });

    if (!course) {
      throw new NotFoundException('Curso no encontrado');
    }
    const lesson = this.lessonRepository.create({
      ...data,
      course: { id: data.course },
    });
    return this.lessonRepository.save(lesson);
  }

  async editCourse(data: EditCourseDto): Promise<Course> {
    const course = await this.courseRepository.findOne({
      where: { id: Number(data.id) },
    });
    if (!course) {
      throw new NotFoundException('Curso no encontrado');
    }

    const { categoryId, ...courseData } = data;
    Object.assign(course, courseData);

    if (categoryId !== undefined) {
      course.category = categoryId ? ({ id: categoryId } as any) : null;
    }

    return this.courseRepository.save(course);
  }

  deleteCourse(id: number) {
    return this.courseRepository.delete(id);
  }

  deleteLesson(id: number) {
    return this.lessonRepository.delete(id);
  }

  findCourseWithLessons(id: number) {
    return this.courseRepository.findOne({
      where: { id },
      relations: ['lessons', 'category'],
    });
  }

  findAllCourses(): Promise<Course[]> {
    return this.courseRepository.find({ relations: ['category'] });
  }

  findAllLessons(): Promise<Lesson[]> {
    return this.lessonRepository.find();
  }

  async markLessonAsCompleted(
    userId: number,
    lessonId: number,
  ): Promise<UserLessonProgress> {
    const lesson = await this.lessonRepository.findOne({
      where: { id: lessonId },
    });
    if (!lesson) {
      throw new NotFoundException('Lesson not found');
    }

    const existingProgress = await this.progressRepository.findOne({
      where: {
        user: { id: userId },
        lesson: { id: lessonId },
      },
    });

    if (existingProgress) {
      return existingProgress;
    }

    const progress = this.progressRepository.create({
      user: { id: userId },
      lesson: { id: lessonId },
      completed: true,
    });

    return this.progressRepository.save(progress);
  }

  async getUserCourseProgress(
    userId: number,
    courseId: number,
  ): Promise<{
    percent: number;
    completedLessons: number;
    totalLessons: number;
  }> {
    const course = await this.courseRepository.findOne({
      where: { id: courseId },
      relations: ['lessons'],
    });

    if (!course) {
      throw new NotFoundException('Course not found');
    }

    const totalLessons = course.lessons.length;
    if (totalLessons === 0) {
      return { percent: 0, completedLessons: 0, totalLessons: 0 };
    }

    const completedLessonsCount = await this.progressRepository.count({
      where: {
        user: { id: userId },
        lesson: { course: { id: courseId } },
        completed: true,
      },
    });

    const percent = Math.round((completedLessonsCount / totalLessons) * 100);

    return {
      percent,
      completedLessons: completedLessonsCount,
      totalLessons,
    };
  }

  async getUserAllCoursesProgress(userId: number): Promise<any[]> {
    // Get all progress entries for the user with lesson and course relations
    const progressEntries = await this.progressRepository.find({
      where: { user: { id: userId }, completed: true },
      relations: ['lesson', 'lesson.course'],
    });

    // Extract unique course IDs
    const courseIds = new Set<number>();
    progressEntries.forEach((entry) => {
      if (entry.lesson && entry.lesson.course) {
        courseIds.add(entry.lesson.course.id);
      }
    });

    // Calculate progress for each course
    const coursesProgress = await Promise.all(
      Array.from(courseIds).map(async (courseId) => {
        const progress = await this.getUserCourseProgress(userId, courseId);
        const course = await this.courseRepository.findOne({
          where: { id: courseId },
        });
        return {
          course,
          ...progress,
        };
      }),
    );

    return coursesProgress;
  }

  findCoursesByCategory(categoryId: number): Promise<Course[]> {
    return this.courseRepository.find({
      where: { category: { id: categoryId } },
    });
  }
}
