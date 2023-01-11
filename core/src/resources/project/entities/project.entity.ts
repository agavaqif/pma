import { Column, Entity, JoinColumn, JoinTable, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ExecType } from 'src/resources/exec-type/entities/exec-type.entity';
import { Kp } from 'src/resources/kp/entities/kp.entity';
import { ProjectSettings } from './project-settings.entity';
import { Mq } from 'src/resources/mq/entities/mq.entity';
import { Crew } from 'src/resources/crew/entities/crew.entity';
import { IsCompleted } from 'src/resources/is-completed/entities/is-completed.entity';

@Entity()
export class Project {
  @PrimaryGeneratedColumn({ name: 'project_id' })
  projectId: number;

  @Column()
  name: string;

  @JoinTable()
  @OneToMany(() => Kp, (kp) => kp.project)
  kps: Kp[];

  @JoinTable()
  @OneToMany(() => ExecType, (execType) => execType.project)
  execTypes: ExecType[];

  @JoinTable()
  @OneToMany(() => Mq, (mq) => mq.project)
  mqs: Mq[];

  @JoinTable()
  @OneToMany(() => Crew, (crew) => crew.crewProject)
  crews: Crew[];

  @OneToMany(() => IsCompleted, (isCompleted) => isCompleted.project)
  isCompleted: IsCompleted[];

  @OneToOne(() => ProjectSettings, (projectSettings) => projectSettings.project)
  @JoinColumn()
  projectSettings: ProjectSettings;
}
