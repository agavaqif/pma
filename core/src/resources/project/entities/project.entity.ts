import { Kp } from 'src/resources/kp/entities/kp.entity';
import { Column, Entity, JoinTable, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
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
}
