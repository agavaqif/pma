import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ExecType } from 'src/resources/exec-type/entities/exec-type.entity';
import { Project } from '../project/entities/project.entity';
import { CreateKpsDto } from './dto/create-kps.dto';
import { UpdateKpDto } from './dto/update-kp.dto';
import { Kp } from './entities/kp.entity';
import { BatchUpdateKpsDto } from './dto/batch-update-kps.dto';
import { IsCompletedService } from '../is-completed/is-completed.service';
import { Mq } from '../mq/entities/mq.entity';
import { ProjectService } from '../project/project.service';

@Injectable()
export class KpService {
  constructor(
    @InjectRepository(Kp)
    private kpRepo: Repository<Kp>,
    // @InjectRepository(Project)
    // private projectRepo: Repository<Project>,
    private isCompletedService: IsCompletedService,
    @InjectRepository(ExecType)
    private execTypeRepo: Repository<ExecType>,
    @InjectRepository(Mq)
    private mqRepo: Repository<Mq>,
    private readonly projectService: ProjectService,
  ) {}

  async createKps(projectId: number, { start, end, kpUnit, accuracy, execTypeId }: CreateKpsDto) {
    // ! 👈 Breakpoint
    const kps = [];
    const length = (end - start) / accuracy;
    // const projectSettings = { kpUnit, accuracy };
    // const updatedProject = await this.projectRepo.update({ projectId }, { projectSettings });
    const updatedProjectSettings = await this.projectService.updateProjectSettings(projectId, { kpUnit, accuracy, defaultExecTypeId: execTypeId }); // ! 👈 Might be a problem
    for (let i = 0; i < length; i++) {
      const kp = this.kpRepo.create({
        start: start + accuracy * i,
        end: start + accuracy * (i + 1),
        project: { projectId } as Project,
        execType: { execTypeId } as ExecType,
      });
      kps.push(kp);
    }
    const savedKps = await this.kpRepo.save(kps);
    await this.batchUpdateIsCompleted(projectId, execTypeId, savedKps);
    return { savedKps, updatedProjectSettings };
  }

  async findAllByProjectId(projectId: number) {
    const kps = await this.kpRepo.find({ where: { project: { projectId } }, relations: ['execType'] });
    return kps;
  }

  findOne(kpId: number) {
    const kp = this.kpRepo.findOne(kpId);
    return kp;
  }

  async update(kpId: number, updateKpDto: UpdateKpDto) {
    const kp = this.kpRepo.update(kpId, updateKpDto);
    return kp;
  }

  async updateBatch(projectId: number, batchUpdateKpsDto: BatchUpdateKpsDto) {
    const { execTypeId, ranges } = batchUpdateKpsDto;
    const allKps = await this.findAllByProjectId(projectId);
    const kpsInRanges = allKps.filter((kp) => {
      const { start, end } = kp;
      return ranges.some((range) => start >= range.start && end <= range.end);
    });
    kpsInRanges.forEach((kp) => this.kpRepo.update(kp, { execType: { execTypeId } as ExecType }));
    for (const kp of kpsInRanges) {
      await this.kpRepo.update(kp, { execType: { execTypeId } as ExecType });
    }

    await this.batchUpdateIsCompleted(projectId, execTypeId, kpsInRanges);
    return true;
  }

  async remove(kpId: number) {
    const kp = await this.kpRepo.delete(kpId);
    return kp;
  }

  async removeAll() {
    const kps = await this.kpRepo.delete({});
    return kps;
  }

  async batchUpdateIsCompleted(projectId: number, execTypeId: number, kps: Kp[]) {
    for (const kp of kps) {
      await this.isCompletedService.removeByKpId(kp.kpId);
    }
    const { mqs } = await this.execTypeRepo.findOne(execTypeId, { relations: ['mqs'] });
    for (const kp of kps) {
      for (const mq of mqs) {
        const { mqSteps } = await this.mqRepo.findOne(mq.mqId, { relations: ['mqSteps'] });
        for (const mqStep of mqSteps) {
          await this.isCompletedService.create(projectId, kp.kpId, mq.mqId, mqStep.stepId);
        }
      }
    }
    return true;
  }

  async updateIsCompletedByExecType(projectId: number, execTypeId: number) {
    const kps = await this.kpRepo.find({
      where: {
        execType: { execTypeId },
      },
      relations: ['execType', 'project'],
    });
    const { defaultExecType } = await this.projectService.getProjectSettings(projectId);
    return await this.batchUpdateIsCompleted(projectId, defaultExecType.execTypeId, kps);
  }
}
