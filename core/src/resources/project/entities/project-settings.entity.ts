import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ExecType } from 'src/resources/exec-type/entities/exec-type.entity';
import { KpUnit } from 'src/shared/enums/kp-unit.enum';
import { Project } from './project.entity';

@Entity()
export class ProjectSettings {
  @PrimaryGeneratedColumn({ name: 'project_settings_id' })
  projectSettingsId: number;

  @Column({ name: 'kp_unit', type: 'enum', enum: KpUnit, nullable: true })
  kpUnit: KpUnit;

  @Column({ nullable: true })
  accuracy: number;

  @OneToOne(() => ExecType, (execType) => execType.projectSettings)
  @JoinColumn()
  defaultExecType: ExecType;

  @OneToOne(() => Project, (project) => project.projectSettings, { cascade: true })
  project: Project;
}
