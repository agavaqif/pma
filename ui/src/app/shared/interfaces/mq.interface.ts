import { MqUnit } from '../enums/mq-unit.enum';
import { IMqStep } from './mq-step.interface';

export interface IMq {
  mqId?: number;
  name: string;
  isBalanced: boolean;
  quantity?: number;
  unitOfMeasure: MqUnit;
  mqSteps: IMqStep[] | Partial<IMqStep>[];
}
