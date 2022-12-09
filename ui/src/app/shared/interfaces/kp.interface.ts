import { KpUnit } from '../enums/kp-unit.enum';
import { IProject } from './project.interface';

export interface IKp {
  kpId: number;
  start: number;
  end: number;
  project: IProject;
}

export interface IKpCreate {
  start: number;
  end: number;
  kpUnit: KpUnit;
  accuracy: number;
}
