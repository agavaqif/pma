import { Mq } from 'src/resources/mq/entities/mq.entity';
import { Project } from 'src/resources/project/entities/project.entity';
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, ManyToOne } from 'typeorm';

@Entity()
export class Crew {
  @PrimaryGeneratedColumn({ name: 'crew_id' })
  crewId: number;

  @Column()
  name: string;

  @Column({ nullable: true, name: 'start_date' })
  startDate: string;

  @Column({ nullable: true, name: 'end_date' })
  endDate: string;

  @Column({ name: 'is_active', default: false })
  isActive: boolean;

  @ManyToOne(() => Mq, (mq) => mq.crews)
  @JoinColumn({ name: 'main_performing_activity_id' })
  mainPerformingActivity: Mq;

  @ManyToOne(() => Project, (project) => project.crews)
  crewProject: Project;
}
