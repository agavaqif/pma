import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { Kp } from '../../kp/entities/kp.entity';
import { Mq } from '../../mq/entities/mq.entity';
import { MqStep } from '../../mq-step/entities/mq-step.entity';

@Entity()
export class IsCompleted {
  @PrimaryGeneratedColumn()
  isCompletedId: number;

  @Column({ default: false })
  isCompleted: boolean;

  @ManyToOne(() => Kp, (kp) => kp.isCompleted, { onDelete: 'CASCADE' })
  @JoinColumn()
  kp: Kp;

  @ManyToOne(() => Mq, (mq) => mq.isCompleted, { onDelete: 'CASCADE' })
  @JoinColumn()
  mq: Mq;

  @OneToOne(() => MqStep, (mqStep) => mqStep.isCompleted, { onDelete: 'CASCADE' })
  @JoinColumn()
  mqStep: MqStep;
}
