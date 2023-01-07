import { IisCompleted } from './is-completed.interface';

export interface IStepNote {
  noteId: number;
  note: string;
  isCompleted: IisCompleted;
}
