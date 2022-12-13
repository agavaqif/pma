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

  async create(createMqDto: CreateMqDto) {
    const mq = this.repo.create(createMqDto);
    return await this.repo.save(mq);
  }

  async findAll() {
    const mqs = await this.repo.find();
    return mqs;
  }

  async findOne(mqId: number) {
    const mq = await this.repo.findOne(mqId);
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
