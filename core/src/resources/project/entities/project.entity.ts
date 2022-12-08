import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Project {
  @PrimaryGeneratedColumn({ name: 'project_id' })
  projectId: number;

  @Column()
  name: string;
}
