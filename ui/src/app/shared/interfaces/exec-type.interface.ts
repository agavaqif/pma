import { IProject } from 'src/app/shared/interfaces/project.interface';
import { IMq } from './mq.interface';

export interface IExecType {
  execTypeId: number;
  name: string;
  code: string;
  project: IProject;
  mqs: IMq[];
  isDefault: boolean;
}
