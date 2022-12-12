import { Column, Entity, JoinTable, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ExecType } from 'src/resources/exec-type/entities/exec-type.entity';
import { Kp } from 'src/resources/kp/entities/kp.entity';
import { ProjectSettings } from './project-settings.entity';

@Entity()
export class Project {
  @PrimaryGeneratedColumn({ name: 'project_id' })
  projectId: number;

  @Column()
  name: string;

  @Column(() => ProjectSettings, { prefix: false })
  projectSettings: ProjectSettings;

  @JoinTable()
  @OneToMany(() => Kp, (kp) => kp.project)
  kps: Kp[];

  @JoinTable()
  @OneToMany(() => ExecType, (execType) => execType.project)
  execTypes: ExecType[];
}
