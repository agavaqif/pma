import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Mq } from '../mq/entities/mq.entity';
import { CreateMqStepDto } from './dto/create-mq-step.dto';
import { UpdateMqStepDto } from './dto/update-mq-step.dto';
import { MqStep } from './entities/mq-step.entity';

@Injectable()
export class MqStepService {
  constructor(
    @InjectRepository(MqStep)
    private mqStepRepository: Repository<MqStep>,
  ) {}

  async create(mqId: number, createMqStepDto: CreateMqStepDto) {
    const mqStep = this.mqStepRepository.create({ ...createMqStepDto });
    mqStep.mq = { mqId } as Mq;
    return await this.mqStepRepository.save(mqStep);
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
