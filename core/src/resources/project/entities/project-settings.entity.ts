import { ExecType } from 'src/resources/exec-type/entities/exec-type.entity';
import { KpUnit } from 'src/shared/enums/kp-unit.enum';
import { Column, Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { Project } from './project.entity';

@Entity()
export class ProjectSettings {
  @PrimaryGeneratedColumn({ name: 'project_settings_id' })
  projectSettingsId: number;

  @Column({ name: 'kp_unit', type: 'enum', enum: KpUnit })
  kpUnit: KpUnit;

  @Column({ nullable: true })
  accuracy: number;

  @OneToOne(() => Project, (project) => project.projectSettings, { onDelete: 'CASCADE' }) // ! 👈
  project: Project;

  @OneToOne(() => ExecType, (execType) => execType.projectSettings)
  @JoinColumn()
  defaultExecType: ExecType;
}
