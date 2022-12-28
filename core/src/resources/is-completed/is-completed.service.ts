import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Kp } from '../kp/entities/kp.entity';
import { MqStep } from '../mq-step/entities/mq-step.entity';
import { Mq } from '../mq/entities/mq.entity';
import { IsCompleted } from './entities/is-completed.entity';

@Injectable()
export class IsCompletedService {
  constructor(
    @InjectRepository(IsCompleted)
    private isCompletedRepository: Repository<IsCompleted>,
  ) {}

  async create(kpId: number, mqId: number, stepId: number) {
    const isCompleted = new IsCompleted();
    isCompleted.kp = { kpId } as Kp;
    isCompleted.mq = { mqId } as Mq;
    isCompleted.mqStep = { stepId } as MqStep;
    return await this.isCompletedRepository.save(isCompleted);
  }

  async findAllByKpId(kpId: number) {
    const isCompleted = await this.isCompletedRepository.find({
      where: { kp: { kpId } },
      relations: ['kp', 'mq', 'mqStep'],
    });
    return isCompleted;
  }

  async findAllByMqId(mqId: number) {
    const isCompleted = await this.isCompletedRepository.find({
      where: { mq: { mqId } },
      relations: ['kp', 'mq', 'mqStep'],
    });
    return isCompleted;
  }

  async findOne(isCompletedId: number) {
    const isCompleted = await this.isCompletedRepository.findOne({
      where: { isCompletedId },
      relations: ['kp', 'mq', 'mqStep'],
    });
    return isCompleted;
  }

  async update(isCompletedId: number, isCompleted: boolean) {
    const isCompletedToUpdate = await this.isCompletedRepository.findOne({ where: { isCompletedId } });
    isCompletedToUpdate.isCompleted = isCompleted;
    return await this.isCompletedRepository.save(isCompletedToUpdate);
  }

  async delete(isCompletedId: number) {
    const isCompletedToDelete = await this.isCompletedRepository.findOne({ where: { isCompletedId } });
    return await this.isCompletedRepository.remove(isCompletedToDelete);
  }
}
