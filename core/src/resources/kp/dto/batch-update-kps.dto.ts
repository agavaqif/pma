import { IsArray, IsNotEmpty, IsNumber } from 'class-validator';

export class KpRange {
  @IsNotEmpty()
  @IsNumber()
  start: number;

  @IsNotEmpty()
  @IsNumber()
  end: number;
}

export class BatchUpdateKpsDto {
  @IsArray()
  ranges: KpRange[];

  @IsNotEmpty()
  execTypeId: number;
}
