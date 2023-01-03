import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToOne } from 'typeorm';
import { Mq } from 'src/resources/mq/entities/mq.entity';
import { IsCompleted } from 'src/resources/is-completed/entities/is-completed.entity';

@Entity()
export class MqStep {
  @PrimaryGeneratedColumn()
  stepId: number;

  @Column({ nullable: false })
  order: number;

  @Column({ nullable: false })
  title: string;

  @Column({ nullable: false })
  weight: number;

  @ManyToOne(() => Mq, (mq) => mq.mqSteps, { onDelete: 'CASCADE' })
  mq: Mq;

  @OneToOne(() => IsCompleted, (isCompleted) => isCompleted.mqStep)
  isCompleted: IsCompleted;
}
