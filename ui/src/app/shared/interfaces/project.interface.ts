import { IMq } from './mq.interface';
import { KpUnit } from '../enums/kp-unit.enum';
import { IKp } from './kp.interface';
import { IExecType } from './exec-type.interface';

export interface IProject {
  projectId: number;
  name: string;
  projectSettings: IProjectSettings;
  kps: IKp[];
  mqs: IMq[];
  execTypes: IExecType[];
}

export interface IProjectSettings {
  kpUnit: KpUnit;
  accuracy: number;
}
