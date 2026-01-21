import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ContactMessage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @Column()
  email: string;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  date: Date;
}
