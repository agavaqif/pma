import { Column, Entity, PrimaryGeneratedColumn, JoinTable, OneToMany, ManyToOne, ManyToMany } from 'typeorm';
import { Kp } from 'src/resources/kp/entities/kp.entity';
import { Project } from 'src/resources/project/entities/project.entity';
import { Mq } from 'src/resources/mq/entities/mq.entity';

@Entity('exec_type')
export class ExecType {
  @PrimaryGeneratedColumn({ name: 'exec_type_id' })
  execTypeId: number;

  @Column()
  name: string;

  @Column()
  code: string;

  @JoinTable()
  @OneToMany(() => Kp, (kp) => kp.execType)
  kps: Kp[];

  @ManyToOne(() => Project, (project) => project.execTypes)
  project: Project;

  @JoinTable()
  @ManyToMany(() => Mq, (mq) => mq.execTypes)
  mqs: Mq[];
}
