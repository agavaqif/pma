import { IKp } from './kp.interface';

export interface IProject {
  projectId: number;
  name: string;
  kps: IKp[];
}
