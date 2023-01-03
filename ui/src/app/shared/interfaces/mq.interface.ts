import { MqUnit } from '../enums/mq-unit.enum';
import { IMqStep } from './mq-step.interface';

export interface IMq {
  mqId?: number;
  name: string;
  isBalanced: boolean;
  unitOfMeasure: MqUnit;
  mqSteps: IMqStep[] | Partial<IMqStep>[];
}
