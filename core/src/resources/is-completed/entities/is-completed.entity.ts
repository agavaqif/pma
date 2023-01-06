import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, ManyToOne, OneToOne, JoinTable } from 'typeorm';
import { Kp } from '../../kp/entities/kp.entity';
import { Mq } from '../../mq/entities/mq.entity';
import { MqStep } from '../../mq-step/entities/mq-step.entity';
import { Project } from 'src/resources/project/entities/project.entity';
import { StepNote } from 'src/resources/step-note/entities/step-note.entity';

@Entity()
export class IsCompleted {
  @PrimaryGeneratedColumn()
  isCompletedId: number;

  @Column({ default: false })
  isCompleted: boolean;

  @ManyToOne(() => Kp, (kp) => kp.isCompleted, { cascade: true })
  @JoinColumn()
  kp: Kp;

  @ManyToOne(() => Mq, (mq) => mq.isCompleted, { cascade: true })
  @JoinColumn()
  mq: Mq;

  @ManyToOne(() => MqStep, (mqStep) => mqStep.isCompleted, { cascade: true })
  @JoinColumn()
  mqStep: MqStep;

  @ManyToOne(() => Project, (project) => project.isCompleted, { cascade: true })
  @JoinColumn()
  project: Project;

  @JoinTable()
  @OneToOne(() => StepNote, (stepNote) => stepNote.isCompleted)
  stepNote: StepNote;
}
