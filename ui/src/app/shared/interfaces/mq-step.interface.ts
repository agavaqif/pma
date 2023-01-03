import { IMq } from './mq.interface';

export interface IMqStep {
  stepId: number;
  order: number;
  title: string;
  weight: number;
  mq: IMq;
}
