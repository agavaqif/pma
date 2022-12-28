import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, ManyToMany, OneToMany } from 'typeorm';

import { Project } from 'src/resources/project/entities/project.entity';
import { MqUnit } from 'src/shared/enums/mq-unit.enum';
import { ExecType } from 'src/resources/exec-type/entities/exec-type.entity';
import { Crew } from 'src/resources/crew/entities/crew.entity';

@Entity({ name: 'measurable_quantity' })
export class Mq {
  @PrimaryGeneratedColumn({ name: 'mq_id' })
  mqId: number;

  @Column()
  name: string;

  @Column({ name: 'is_balanced', type: 'boolean', default: false })
  isBalanced: boolean;

  @Column({ name: 'unit_of_measure', type: 'enum', enum: MqUnit })
  unitOfMeasure: MqUnit;

  @ManyToOne(() => Project, (project) => project.mqs, { onDelete: 'CASCADE' })
  project: Project;

  @ManyToMany(() => ExecType, (execType) => execType.mqs)
  execTypes: ExecType[];

  @OneToMany(() => Crew, (crew) => crew.mainPerformingActivity)
  crews: Crew[];
}
