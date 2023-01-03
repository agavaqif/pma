import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Project } from 'src/resources/project/entities/project.entity';
import { ExecType } from 'src/resources/exec-type/entities/exec-type.entity';
import { IsCompleted } from 'src/resources/is-completed/entities/is-completed.entity';

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

  @ManyToOne(() => ExecType, (execType) => execType.kps)
  execType: ExecType;

  @OneToMany(() => IsCompleted, (isCompleted) => isCompleted.kp)
  isCompleted: IsCompleted[];
}
