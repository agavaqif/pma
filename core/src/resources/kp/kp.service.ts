import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ExecType } from 'src/resources/exec-type/entities/exec-type.entity';
import { Project } from '../project/entities/project.entity';
import { CreateKpsDto } from './dto/create-kps.dto';
import { UpdateKpDto } from './dto/update-kp.dto';
import { Kp } from './entities/kp.entity';
import { BatchUpdateKpsDto } from './dto/batch-update-kps.dto';

@Injectable()
export class KpService {
  constructor(
    @InjectRepository(Kp)
    private repo: Repository<Kp>,
    @InjectRepository(Project)
    private projectRepo: Repository<Project>,
  ) {}

  async createKps(projectId: number, { start, end, kpUnit, accuracy, execTypeId }: CreateKpsDto) {
    const kps = [];
    const length = (end - start) / accuracy;
    const projectSettings = { kpUnit, accuracy };
    const updatedProject = await this.projectRepo.update({ projectId }, { projectSettings });
    for (let i = 0; i < length; i++) {
      const kp = this.repo.create({
        start: start + accuracy * i,
        end: start + accuracy * (i + 1),
        project: { projectId } as Project,
        execType: { execTypeId } as ExecType,
      });
      kps.push(kp);
    }
    const savedKps = await this.repo.save(kps);
    return { updatedProject, savedKps };
  }

  async findAllByProjectId(projectId: number) {
    const kps = await this.repo.find({ where: { project: { projectId } }, relations: ['execType'] });
    return kps;
  }

  findOne(kpId: number) {
    const kp = this.repo.findOne(kpId);
    return kp;
  }

  async update(kpId: number, updateKpDto: UpdateKpDto) {
    const kp = this.repo.update(kpId, updateKpDto);
    return kp;
  }

  async updateBatch(projectId: number, batchUpdateKpsDto: BatchUpdateKpsDto) {
    const { execTypeId, ranges } = batchUpdateKpsDto;
    const allKps = await this.findAllByProjectId(projectId);
    const kpsInRanges = allKps.filter((kp) => {
      const { start, end } = kp;
      return ranges.some((range) => start >= range.start && end <= range.end);
    });
    kpsInRanges.forEach((kp) => this.repo.update(kp, { execType: { execTypeId } as ExecType }));
    for (const kp of kpsInRanges) {
      await this.repo.update(kp, { execType: { execTypeId } as ExecType });
    }
    return true;
  }

  async remove(kpId: number) {
    const kp = await this.repo.delete(kpId);
    return kp;
  }

  async removeAll() {
    const kps = await this.repo.delete({});
    return kps;
  }
}
