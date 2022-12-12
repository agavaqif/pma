import { IExecType } from 'src/app/shared/interfaces/exec-type.interface';
import { KpUnit } from '../enums/kp-unit.enum';
import { IProject } from './project.interface';

export interface IKp {
  kpId: number;
  start: number;
  end: number;
  project: IProject;
  execType: IExecType;
}

export interface IKpCreate {
  start: number;
  end: number;
  kpUnit: KpUnit;
  accuracy: number;
  execTypeId: number;
}
