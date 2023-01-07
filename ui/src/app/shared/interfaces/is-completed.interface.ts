import { ICrew } from './crew.interface';
import { IKp } from './kp.interface';
import { IMqStep } from './mq-step.interface';
import { IMq } from './mq.interface';
import { IProject } from './project.interface';
import { IStepNote } from './step-note.interface';

export interface IisCompleted {
  isCompletedId: number;
  isCompleted: boolean;
  completedDate: string;
  crew: ICrew;
  kp: IKp;
  mqStep: IMqStep;
  mq: IMq;
  project: IProject;
  stepNote: IStepNote;
}

export interface ICompletedStep {
  crewId: number;
  date: string;
  note: string;
}
