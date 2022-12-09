import { Project } from 'src/resources/project/entities/project.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Kp {
  @PrimaryGeneratedColumn({ name: 'kp_id' })
  kpId: number;

  @Column()
  start: number;

  @Column()
  end: number;

  @ManyToOne(() => Project, (project) => project.kps, { onDelete: 'CASCADE' })
  project: Project;
}
