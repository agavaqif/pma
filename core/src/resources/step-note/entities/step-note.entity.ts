import { IsCompleted } from 'src/resources/is-completed/entities/is-completed.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';

@Entity()
export class StepNote {
  @PrimaryGeneratedColumn({ name: 'note_id' })
  noteId: number;

  @Column()
  note: string;

  @OneToOne(() => IsCompleted, (isCompleted) => isCompleted.stepNote, { onDelete: 'CASCADE', cascade: true })
  @JoinColumn()
  isCompleted: IsCompleted;
}
