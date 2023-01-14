import { IMqStep } from 'src/app/shared/interfaces/mq-step.interface';

export enum StepState {
  LOADED = 'loaded',
  CREATED = 'created',
  UPDATED = 'updated',
  DELETED = 'deleted',
}

export interface IStepLists {
  deleteList: number[];
  updateList: Partial<IMqStep>[];
  createList: Partial<IMqStep>[];
}

export interface IGridStep extends Partial<IMqStep> { 
  state: StepState;
  guid: string;
}
