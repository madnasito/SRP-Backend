import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  Unique,
} from 'typeorm';
import { User } from '../../user/entity/user.entity';
import { Lesson } from './lesson.entity';

@Entity()
@Unique(['user', 'lesson'])
export class UserLessonProgress {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.id, { onDelete: 'CASCADE' })
  user: User;

  @ManyToOne(() => Lesson, (lesson) => lesson.id, { onDelete: 'CASCADE' })
  lesson: Lesson;

  @Column({ default: true })
  completed: boolean;

  @CreateDateColumn()
  completedAt: Date;
}
