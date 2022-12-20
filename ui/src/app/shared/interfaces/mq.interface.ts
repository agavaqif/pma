import { MqUnit } from "../enums/mq-unit.enum";

export interface IMq {
  mqId?: number;
  name: string;
  isBalanced: boolean;
  unitOfMeasure: MqUnit;
}
