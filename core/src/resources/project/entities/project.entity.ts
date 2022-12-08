import { Kp } from 'src/resources/kp/entities/kp.entity';
import { Column, Entity, JoinTable, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Project {
  @PrimaryGeneratedColumn({ name: 'project_id' })
  projectId: number;

  @Column()
  name: string;

  @JoinTable()
  @OneToMany(() => Kp, (kp) => kp.project)
  kps: Kp[];
}
