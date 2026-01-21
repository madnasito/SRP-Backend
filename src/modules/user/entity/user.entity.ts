import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ unique: true, type: 'varchar', length: 255 })
  email: string;

  @Column({ type: 'text' })
  password: string;

  @Column({ default: false, type: 'boolean' })
  admin: boolean;

  @Column({ default: true, type: 'boolean' })
  active: boolean;
}
