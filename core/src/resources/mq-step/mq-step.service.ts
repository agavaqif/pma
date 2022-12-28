import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IsCompletedService } from '../is-completed/is-completed.service';
import { Mq } from '../mq/entities/mq.entity';
import { CreateMqStepDto } from './dto/create-mq-step.dto';
import { UpdateMqStepDto } from './dto/update-mq-step.dto';
import { MqStep } from './entities/mq-step.entity';

@Injectable()
export class MqStepService {
  constructor(
    @InjectRepository(MqStep)
    private mqStepRepository: Repository<MqStep>,
    private isCompletedService: IsCompletedService,
  ) {}

  async create(kpId: number, mqId: number, createMqStepDto: CreateMqStepDto) {
    const mqStep = this.mqStepRepository.create({ ...createMqStepDto });
    mqStep.mq = { mqId } as Mq;
    await this.mqStepRepository.save(mqStep);
    await this.isCompletedService.create(kpId, mqId, mqStep.stepId);
    return mqStep;
  }

  async findAllByMqId(mqId: number) {
    const mqSteps = await this.mqStepRepository.find({ where: { mq: { mqId } } });
    return mqSteps;
  }

  async findOne(stepId: number) {
    const mqStep = await this.mqStepRepository.findOne(stepId);
    return mqStep;
  }

  async update(stepId: number, updateMqStepDto: UpdateMqStepDto) {
    const mqStep = await this.mqStepRepository.update(stepId, updateMqStepDto);
    return mqStep;
  }

  async remove(stepId: number) {
    const mqStep = await this.mqStepRepository.delete(stepId);
    return mqStep;
  }
}
