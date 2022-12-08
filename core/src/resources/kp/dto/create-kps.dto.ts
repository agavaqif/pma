import { IsEnum, IsNumber } from 'class-validator';
import { KpUnit } from 'src/shared/enums/kp-unit.enum';

export class CreateKpsDto {
  @IsNumber()
  start: number;

  @IsNumber()
  end: number;

  @IsEnum(KpUnit)
  kpUnit: KpUnit;

  @IsNumber()
  accuracy: number;
}
