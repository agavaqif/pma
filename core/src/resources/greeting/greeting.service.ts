import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateGreetingDto } from './dto/create-greeting.dto';
import { Greeting } from './entities/greeting.entity';

@Injectable()
export class GreetingService {
  constructor(
    @InjectRepository(Greeting)
    private repo: Repository<Greeting>,
  ) {}
  async create(createGreetingDto: CreateGreetingDto) {
    const greeting = this.repo.create(createGreetingDto);
    return this.repo.save(greeting);
  }

  findAll() {
    return this.repo.find();
  }
}
