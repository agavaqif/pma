import { IsCompleted } from 'src/resources/is-completed/entities/is-completed.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm';

@Entity()
export class StepNote {
  @PrimaryGeneratedColumn({ name: 'note_id' })
  noteId: number;

  @Column()
  note: string;

  @OneToOne(() => IsCompleted, (isCompleted) => isCompleted.stepNote, { cascade: true })
  isCompleted: IsCompleted;
}
