import { Project } from 'src/resources/project/entities/project.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMqDto } from './dto/create-mq.dto';
import { UpdateMqDto } from './dto/update-mq.dto';
import { Mq } from './entities/mq.entity';
// import { MqStepService } from '../mq-step/mq-step.service';
import { MqStep } from '../mq-step/entities/mq-step.entity';
import { IsCompletedService } from '../is-completed/is-completed.service';

@Injectable()
export class MqService {
  constructor(
    @InjectRepository(Mq)
    private readonly repo: Repository<Mq>,
    // private readonly mqStepService: MqStepService,
    private readonly isCompletedService: IsCompletedService,
    @InjectRepository(MqStep)
    private readonly mqStepRepo: Repository<MqStep>,
  ) {}

  async create(createMqDto: CreateMqDto, projectId: number) {
    const mq = this.repo.create(createMqDto);
    mq.project = { projectId } as Project;
    return await this.repo.save(mq);
  }

  async findAllByProjectId(projectId: number) {
    const mqs = await this.repo.find({
      where: { project: { projectId } },
      relations: ['mqSteps'],
    });
    mqs.forEach((mq) => {
      mq.mqSteps.sort((a, b) => a.order - b.order);
    });
    return mqs;
  }

  async findOne(mqId: number) {
    const mq = await this.repo.findOne(mqId, { relations: ['mqSteps'] });
    mq.mqSteps.sort((a, b) => a.order - b.order);
    return mq;
  }

  async update(projectId: number, mqId: number, { stepsList, ...updateMqDto }: UpdateMqDto) {
    const mq = await this.repo.findOne(mqId, { relations: ['mqSteps', 'execTypes', 'execTypes.kps'] });
    const { createList, updateList, deleteList } = stepsList;
    for (const step of createList) {
      const mqStep = this.mqStepRepo.create(step);
      await this.mqStepRepo.save(mqStep);
      mq.mqSteps.push(mqStep);
      await this.repo.save(mq);
      (mq.execTypes as any).forEach((execType: any) => {
        for (const { kpId } of (execType as any).kps) {
          this.isCompletedService.create(projectId, kpId, mqId, mqStep.stepId);
        }
      });
    }
    for (const step of updateList) {
      // await this.mqStepRepo.update(step.stepId, step);
      const mqStep = await this.mqStepRepo.findOne(step.stepId);
      this.mqStepRepo.merge(mqStep, step);
      await this.mqStepRepo.save(mqStep);
    }
    for (const stepId of deleteList) {
      await this.mqStepRepo.delete(stepId);
      // await this.isCompletedService.removeByStepId(stepId);
    }

    // Update Only Mq
    const currentMq = await this.repo.findOne(mqId);
    await this.repo.merge(currentMq, updateMqDto);
    return await this.repo.save(currentMq);
  }

  async remove(mqId: number) {
    const mq = await this.repo.delete(mqId);
    return mq;
  }
}
