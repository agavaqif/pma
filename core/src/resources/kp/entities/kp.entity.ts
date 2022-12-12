import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Project } from 'src/resources/project/entities/project.entity';
import { ExecType } from 'src/resources/exec-type/entities/exec-type.entity';

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
}
