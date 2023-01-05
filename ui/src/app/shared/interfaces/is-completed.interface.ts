import { IKp } from './kp.interface';
import { IMqStep } from './mq-step.interface';
import { IMq } from './mq.interface';
import { IProject } from './project.interface';

export interface IisCompleted {
  isCompletedId: number;
  isCompleted: boolean;
  kp: IKp;
  mqStep: IMqStep;
  mq: IMq;
  project: IProject;
}
