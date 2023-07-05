import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class TodoItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}