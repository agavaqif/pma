import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, ManyToMany, OneToMany, JoinTable } from 'typeorm';

import { Project } from 'src/resources/project/entities/project.entity';
import { MqUnit } from 'src/shared/enums/mq-unit.enum';
import { ExecType } from 'src/resources/exec-type/entities/exec-type.entity';
import { Crew } from 'src/resources/crew/entities/crew.entity';
import { MqStep } from 'src/resources/mq-step/entities/mq-step.entity';
import { IsCompleted } from 'src/resources/is-completed/entities/is-completed.entity';

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

  @JoinTable()
  @OneToMany(() => MqStep, (mqStep) => mqStep.mq)
  mqSteps: MqStep[];

  @OneToMany(() => IsCompleted, (isCompleted) => isCompleted.mq)
  isCompleted: IsCompleted[];
}
