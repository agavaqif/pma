import { PartialType } from '@nestjs/mapped-types';
import { CreateMqStepDto } from './create-mq-step.dto';

export class UpdateMqStepDto extends PartialType(CreateMqStepDto) {}
