import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { Kp } from '../../kp/entities/kp.entity';
import { Mq } from '../../mq/entities/mq.entity';
import { MqStep } from '../../mq-step/entities/mq-step.entity';
import { Project } from 'src/resources/project/entities/project.entity';
import { StepNote } from 'src/resources/step-note/entities/step-note.entity';
import { Crew } from '../../crew/entities/crew.entity';

@Entity({ name: 'is_completed' })
export class IsCompleted {
  @PrimaryGeneratedColumn()
  isCompletedId: number;

  @Column({ default: false })
  isCompleted: boolean;

  @Column({ name: 'completed_date', nullable: true })
  completedDate: string;

  @ManyToOne(() => Kp, (kp) => kp.isCompleted, { cascade: true })
  @JoinColumn()
  kp: Kp;

  @ManyToOne(() => Mq, (mq) => mq.isCompleted, { cascade: true })
  @JoinColumn()
  mq: Mq;

  @ManyToOne(() => MqStep, (mqStep) => mqStep.isCompleted, { onDelete: 'CASCADE', cascade: true })
  @JoinColumn()
  mqStep: MqStep;

  @ManyToOne(() => Project, (project) => project.isCompleted, { cascade: true })
  @JoinColumn()
  project: Project;

  @OneToOne(() => StepNote, (stepNote) => stepNote.isCompleted)
  stepNote: StepNote;

  @ManyToOne(() => Crew, (crew) => crew.isCompleted, { cascade: true })
  @JoinColumn()
  crew: Crew;
}
