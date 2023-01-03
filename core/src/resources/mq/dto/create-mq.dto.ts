import { IsBoolean, IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { MqUnit } from 'src/shared/enums/mq-unit.enum';
import { CreateMqStepDto } from 'src/resources/mq-step/dto/create-mq-step.dto';

export class CreateMqDto {
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsBoolean()
  isBalanced: boolean;

  @IsNotEmpty()
  @IsEnum(MqUnit)
  unitOfMeasure: MqUnit;

  @IsNotEmpty()
  mqSteps: CreateMqStepDto[];
}
