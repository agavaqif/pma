import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from '../project/entities/project.entity';
import { CreateExecTypeDto } from './dto/create-exec-type.dto';
import { UpdateExecTypeDto } from './dto/update-exec-type.dto';
import { ExecType } from './entities/exec-type.entity';

@Injectable()
export class ExecTypeService {
  constructor(
    @InjectRepository(ExecType)
    private readonly repo: Repository<ExecType>,
  ) {}

  async create(createExecTypeDto: CreateExecTypeDto, projectId: number) {
    const execType = this.repo.create(createExecTypeDto);
    execType.project = { projectId } as Project;
    return await this.repo.save(execType);
  }

  async findAllByProjectId(projectId: number) {
    const execTypes = await this.repo.find({ where: { project: { projectId } } });
    return execTypes;
  }

  findOne(execTypeId: number) {
    const execType = this.repo.findOne(execTypeId);
    return execType;
  }

  async update(execTypeId: number, updateExecTypeDto: UpdateExecTypeDto) {
    const execType = await this.repo.findOne(execTypeId);
    this.repo.merge(execType, updateExecTypeDto);
    return await this.repo.save(execType);
  }

  async remove(execTypeId: number) {
    const execType = await this.repo.findOne(execTypeId);
    return await this.repo.remove(execType);
  }
}
