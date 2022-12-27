import { IMq } from './mq.interface';
import { IProject } from './project.interface';

export interface ICrew {
  crewId: number;
  name: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
  mainPerformingActivity: IMq;
  crewProject: IProject;
}

export interface ICrewCreate {
  name: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
  mqId: number;
}
