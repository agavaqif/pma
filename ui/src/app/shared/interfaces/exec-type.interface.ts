import { IProject } from 'src/app/shared/interfaces/project.interface';

export interface IExecType {
  execTypeId?: number;
  name: string;
  code: string;
  project?: IProject;
}
