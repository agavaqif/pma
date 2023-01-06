import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { filterObj } from 'src/core/utils/helpers';
import { Repository } from 'typeorm';
import { Kp } from '../kp/entities/kp.entity';
import { MqStep } from '../mq-step/entities/mq-step.entity';
import { Mq } from '../mq/entities/mq.entity';
import { Project } from '../project/entities/project.entity';
import { IsCompleted } from './entities/is-completed.entity';

@Injectable()
export class IsCompletedService {
  constructor(
    @InjectRepository(IsCompleted)
    private isCompletedRepository: Repository<IsCompleted>,
  ) {}

  async create(projectId: number, kpId: number, mqId: number, stepId: number) {
    const isCompleted = new IsCompleted();
    isCompleted.kp = { kpId } as Kp;
    isCompleted.mq = { mqId } as Mq;
    isCompleted.mqStep = { stepId } as MqStep;
    isCompleted.project = { projectId } as Project;
    return await this.isCompletedRepository.save(isCompleted);
  }

  async removeByMqId(mqId: number) {
    const isCompleted = await this.isCompletedRepository.find({ where: { mq: { mqId } } });
    return await this.isCompletedRepository.remove(isCompleted);
  }

  async removeByKpId(kpId: number) {
    const isCompleted = await this.isCompletedRepository.find({ where: { kp: { kpId } } });
    return await this.isCompletedRepository.remove(isCompleted);
  }

  async findAll(
    { projectId, kpId, mqId, stepId, noteId }: any,
    relations: object = {
      project: false,
      kp: true,
      mq: true,
      mqStep: true,
      stepNote: false,
    },
  ) {
    const isCompleted = await this.isCompletedRepository.find({
      where: {
        ...(projectId && { project: { projectId } }),
        ...(kpId && { kp: { kpId } }),
        ...(mqId && { mq: { mqId } }),
        ...(stepId && { mqStep: { stepId } }),
        ...(noteId && { stepNote: { noteId } }),
      },
      relations: Object.keys(relations).filter((key) => relations[key]),
    });
    isCompleted.forEach((item) => {
      item.project = item.project && filterObj(item.project, 'projectId');
      item.kp = item.kp && filterObj(item.kp, 'kpId', 'name');
      item.mq = item.mq && filterObj(item.mq, 'mqId', 'name');
      item.mqStep = item.mqStep && filterObj(item.mqStep, 'stepId', 'name');
    });
    return isCompleted;
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

  async findAllByProjectId(projectId: number) {
    const isCompleted = await this.isCompletedRepository.find({
      where: { project: { projectId } },
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
