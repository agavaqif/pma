import { MqUnit } from "../enums/mq-unit.enum";

export interface IMq {
  name: string;
  isBalanced: boolean;
  unitOfMeasure: MqUnit;
}
