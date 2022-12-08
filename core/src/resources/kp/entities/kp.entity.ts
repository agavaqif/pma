import { Project } from 'src/resources/project/entities/project.entity';
import { KpUnit } from 'src/shared/enums/kp-unit.enum';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Kp {
  @PrimaryGeneratedColumn({ name: 'kp_id' })
  kpId: number;

  @Column()
  start: number;

  @Column()
  end: number;

  @Column({ name: 'kp_unit', type: 'enum', enum: KpUnit, default: KpUnit.METER })
  kpUnit: KpUnit;

  @Column()
  accuracy: number;

  @ManyToOne(() => Project, (project) => project.kps, { onDelete: 'CASCADE' })
  project: Project;
}
