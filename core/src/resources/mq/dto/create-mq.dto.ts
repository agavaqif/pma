import { IsBoolean, IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { MqUnit } from 'src/shared/enums/mq-unit.enum';

export class CreateMqDto {
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsBoolean()
  isBalanced: boolean;

  @IsNotEmpty()
  @IsEnum(MqUnit)
  unitOfMeasure: MqUnit;
}
