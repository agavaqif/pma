import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Mq } from '../mq/entities/mq.entity';
import { Project } from '../project/entities/project.entity';
import { CreateCrewDto } from './dto/create-crew.dto';
import { UpdateCrewDto } from './dto/update-crew.dto';
import { Crew } from './entities/crew.entity';

@Injectable()
export class CrewService {
  constructor(
    @InjectRepository(Crew)
    private crewRepository: Repository<Crew>,
  ) {}

  async create(projectId: number, { mqId, ...rest }: CreateCrewDto) {
    const crew = this.crewRepository.create({ ...rest });
    crew.crewProject = { projectId } as Project;
    crew.mainPerformingActivity = { mqId } as Mq;
    return this.crewRepository.save(crew);
  }

  async findCrewsByProjectId(projectId: number) {
    const crews = await this.crewRepository.find({ where: { crewProject: { projectId } } });
    return crews;
  }

  async findOne(crewId: number) {
    const crew = await this.crewRepository.findOne(crewId);
    return crew;
  }

  async update(crewId: number, updateCrewDto: UpdateCrewDto) {
    const crew = await this.crewRepository.findOne(crewId);
    this.crewRepository.merge(crew, updateCrewDto);
    return this.crewRepository.save(crew);
  }

  async remove(crewId: number) {
    const crew = await this.crewRepository.findOne(crewId);
    return this.crewRepository.remove(crew);
  }
}
