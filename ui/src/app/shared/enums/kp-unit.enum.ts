import { word } from 'src/app/core/utils/words';
export enum KpUnit {
  METER,
  KILOMETER,
}

export const kpUnits = {
  [KpUnit.METER]: word('METER'),
  [KpUnit.KILOMETER]: word('KILOMETER'),
}