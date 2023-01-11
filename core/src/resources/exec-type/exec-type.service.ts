import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IsCompletedService } from '../is-completed/is-completed.service';
import { KpService } from '../kp/kp.service';
import { Mq } from '../mq/entities/mq.entity';
import { Project } from '../project/entities/project.entity';
import { CreateExecTypeDto } from './dto/create-exec-type.dto';
import { UpdateExecTypeDto } from './dto/update-exec-type.dto';
import { ExecType } from './entities/exec-type.entity';

@Injectable()
export class ExecTypeService {
  constructor(
    @InjectRepository(ExecType)
    private readonly execTypeRepo: Repository<ExecType>,
    @InjectRepository(Mq)
    private readonly mqRepo: Repository<Mq>,
    private readonly isCompletedService: IsCompletedService,
    private readonly kpService: KpService,
  ) {}

  async create(createExecTypeDto: CreateExecTypeDto, projectId: number) {
    const execType = this.execTypeRepo.create(createExecTypeDto);
    execType.project = { projectId } as Project;
    return await this.execTypeRepo.save(execType);
  }

  async findAllByProjectId(projectId: number) {
    const execTypes = await this.execTypeRepo.find({ where: { project: { projectId } }, relations: ['kps', 'mqs'] });
    return execTypes;
  }

  findOne(execTypeId: number) {
    const execType = this.execTypeRepo.findOneOrFail(execTypeId, { relations: ['kps', 'mqs'] });
    return execType;
  }

  async update(execTypeId: number, updateExecTypeDto: UpdateExecTypeDto) {
    const execType = await this.execTypeRepo.findOne(execTypeId);
    this.execTypeRepo.merge(execType, updateExecTypeDto);
    return await this.execTypeRepo.save(execType);
  }

  async addMq(projectId: number, execTypeId: number, mqId: number) {
    const execType = await this.execTypeRepo.findOne(execTypeId, { relations: ['mqs', 'kps'] });
    const mq = await this.mqRepo.findOne(mqId, { relations: ['mqSteps'] });
    for (const { kpId } of execType.kps) {
      for (const { stepId } of mq.mqSteps) {
        await this.isCompletedService.create(projectId, kpId, mqId, stepId);
      }
    }
    execType.mqs.push(mq);
    return await this.execTypeRepo.save(execType);
  }

  async removeMq(execTypeId: number, mqId: number) {
    const execType = await this.execTypeRepo.findOne(execTypeId, { relations: ['mqs'] });
    const mq = await this.mqRepo.findOne(mqId);
    execType.mqs = execType.mqs.filter((m) => m.mqId !== mq.mqId);
    await this.isCompletedService.removeByMqId(mqId);
    return await this.execTypeRepo.save(execType);
  }

  async remove(projectId: number, execTypeId: number) {
    await this.kpService.updateIsCompletedByExecType(projectId, execTypeId);
    return await this.execTypeRepo.delete(execTypeId);
  }
}
