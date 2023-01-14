import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { filterObj } from 'src/core/utils/helpers';
import { Repository } from 'typeorm';
import { Crew } from '../crew/entities/crew.entity';
import { Kp } from '../kp/entities/kp.entity';
import { MqStep } from '../mq-step/entities/mq-step.entity';
import { Mq } from '../mq/entities/mq.entity';
import { Project } from '../project/entities/project.entity';
import { StepNote } from '../step-note/entities/step-note.entity';
import { CompleteStepDto } from './dto/complete-step.dto';
import { IsCompleted } from './entities/is-completed.entity';

@Injectable()
export class IsCompletedService {
  constructor(
    @InjectRepository(IsCompleted)
    private isCompletedRepository: Repository<IsCompleted>,
    @InjectRepository(StepNote)
    private stepNoteRepository: Repository<StepNote>,
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

  async removeByStepId(stepId: number) {
    const isCompleted = await this.isCompletedRepository.find({ where: { mqStep: { stepId } } });
    return await this.isCompletedRepository.remove(isCompleted);
  }

  async findAll(
    { projectId, kpId, mqId, stepId },
    relations = {
      project: false,
      kp: true,
      mq: true,
      mqStep: true,
      stepNote: true,
      crew: true,
    },
  ) {
    const isCompleted = await this.isCompletedRepository.find({
      where: {
        ...(projectId && { project: { projectId } }),
        ...(kpId && { kp: { kpId } }),
        ...(mqId && { mq: { mqId } }),
        ...(stepId && { mqStep: { stepId } }),
      },
      relations: Object.keys(relations).filter((key) => relations[key]),
    });
    isCompleted.forEach((item) => {
      item.project = item.project && filterObj(item.project, 'projectId');
      item.kp = item.kp && filterObj(item.kp, 'kpId', 'name');
      item.mq = item.mq && filterObj(item.mq, 'mqId', 'name');
      item.mqStep = item.mqStep && filterObj(item.mqStep, 'stepId', 'name');
    });
    console.log({ isCompleted });
    return isCompleted;
  }

  async findOne(isCompletedId: number) {
    const isCompleted = await this.isCompletedRepository.findOne({
      where: { isCompletedId },
      relations: ['kp', 'mq', 'mqStep'],
    });
    return isCompleted;
  }

  async complete(isCompletedId: number, { crewId, completedDate, note }: CompleteStepDto) {
    const isCompletedToUpdate = await this.isCompletedRepository.findOne({ where: { isCompletedId } });
    isCompletedToUpdate.isCompleted = true;
    isCompletedToUpdate.completedDate = completedDate;
    isCompletedToUpdate.crew = { crewId } as Crew;
    if (note) {
      const stepNote = this.stepNoteRepository.create({ note });
      await this.stepNoteRepository.save(stepNote);
      isCompletedToUpdate.stepNote = stepNote;
    }
    return await this.isCompletedRepository.save(isCompletedToUpdate);
  }

  async delete(isCompletedId: number) {
    const isCompletedToDelete = await this.isCompletedRepository.findOne({ where: { isCompletedId } });
    return await this.isCompletedRepository.remove(isCompletedToDelete);
  }
}
