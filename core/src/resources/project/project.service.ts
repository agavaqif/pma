import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Project } from './entities/project.entity';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private readonly repo: Repository<Project>,
  ) {}

  async create(createProjectDto: CreateProjectDto) {
    const project = this.repo.create(createProjectDto);
    return await this.repo.save(project);
  }

  async findAll() {
    const projects = await this.repo.find();
    return projects;
  }

  async findOne(projectId: number) {
    const project = await this.repo.findOneOrFail({ projectId });
    return project;
  }

  async update(projectId: number, updateProjectDto: UpdateProjectDto) {
    const project = await this.repo.update({ projectId }, updateProjectDto);
    return project;
  }

  async remove(projectId: number) {
    const project = await this.repo.delete({ projectId });
    return project;
  }
}
