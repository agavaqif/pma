import { PartialType } from '@nestjs/mapped-types';
import { IsEmpty, IsNotEmpty } from 'class-validator';
import { CreateMqStepDto } from 'src/resources/mq-step/dto/create-mq-step.dto';
import { MqStep } from 'src/resources/mq-step/entities/mq-step.entity';
import { CreateMqDto } from './create-mq.dto';

export class UpdateMqDto extends PartialType(CreateMqDto) {
  @IsNotEmpty()
  stepsList: {
    createList: CreateMqStepDto[];
    updateList: MqStep[];
    deleteList: number[];
  };

  @IsEmpty()
  mqSteps: MqStep[];
}
