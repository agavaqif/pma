import { IsArray } from 'class-validator';
import { CreateMqStepDto } from './create-mq-step.dto';

export class CreateMqStepsDto {
  @IsArray()
  mqSteps: CreateMqStepDto[];
}
