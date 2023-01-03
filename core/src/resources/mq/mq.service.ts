import { Project } from 'src/resources/project/entities/project.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMqDto } from './dto/create-mq.dto';
import { UpdateMqDto } from './dto/update-mq.dto';
import { Mq } from './entities/mq.entity';

@Injectable()
export class MqService {
  constructor(
    @InjectRepository(Mq)
    private readonly repo: Repository<Mq>,
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

  async update(mqId: number, updateMqDto: UpdateMqDto) {
    const mq = await this.repo.update(mqId, updateMqDto);
    return mq;
  }

  async remove(mqId: number) {
    const mq = await this.repo.delete(mqId);
    return mq;
  }
}
