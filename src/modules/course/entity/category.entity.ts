import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Course } from './course.entity';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'text' })
  imageUrl: string;

  @Column({ type: 'text', nullable: true })
  vision: string;

  @Column({ type: 'text', nullable: true })
  mission: string;

  @OneToMany(() => Course, (course) => course.category)
  courses: Course[];
}
