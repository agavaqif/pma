import { word } from 'src/app/core/utils/words';

export enum MqUnit {
  METER,
  KILOMETER,
}

export const mqUnits = {
  [MqUnit.METER]: word('METER'),
  [MqUnit.KILOMETER]: word('KILOMETER'),
};
