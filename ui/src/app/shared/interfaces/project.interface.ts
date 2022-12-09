import { KpUnit } from '../enums/kp-unit.enum';
import { IKp } from './kp.interface';

export interface IProject {
  projectId: number;
  name: string;
  kps: IKp[];
}

export interface IProjectSettings {
  kpUnit: KpUnit;
  accuracy: number;
}
