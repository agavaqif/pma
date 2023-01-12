import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ExecType } from '../exec-type/entities/exec-type.entity';
import { CreateProjectDto } from './dto/create-project.dto';
import { ProjectSettingsDto } from './dto/project-settings.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ProjectSettings } from './entities/project-settings.entity';
import { Project } from './entities/project.entity';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepo: Repository<Project>,
    @InjectRepository(ProjectSettings)
    private readonly projectSettingsRepo: Repository<ProjectSettings>,
  ) {}

  async create(createProjectDto: CreateProjectDto) {
    const project = this.projectRepo.create(createProjectDto);
    const projectSettings = this.projectSettingsRepo.create();
    projectSettings.project = project;
    await this.projectRepo.save(project);
    await this.projectSettingsRepo.save(projectSettings);
    return project;
  }

  async findAll() {
    const projects = await this.projectRepo.find({
      relations: ['kps', 'execTypes', 'mqs', 'projectSettings'],
    });
    return projects;
  }

  async findOne(projectId: number) {
    const project = await this.projectRepo.findOneOrFail({ projectId }, { relations: ['kps', 'execTypes', 'mqs', 'projectSettings'] });
    return project;
  }

  async update(projectId: number, updateProjectDto: UpdateProjectDto) {
    const project = await this.projectRepo.update({ projectId }, updateProjectDto);
    return project;
  }

  async remove(projectId: number) {
    const project = await this.projectRepo.delete({ projectId });
    return project;
  }

  // ! ProjectSettings
  async getProjectSettings(projectId: number) {
    const projectSettings = await this.projectSettingsRepo.findOneOrFail({
      where: { project: { projectId } },
      relations: ['project', 'defaultExecType'],
    });
    return projectSettings;
  }

  async updateProjectSettings(projectId: number, { kpUnit, accuracy, defaultExecTypeId }: ProjectSettingsDto) {
    const projectSettings = await this.projectSettingsRepo.findOneOrFail({
      where: { project: { projectId } },
      relations: ['project', 'defaultExecType'],
    });
    if (kpUnit) projectSettings.kpUnit = kpUnit;
    if (accuracy) projectSettings.accuracy = accuracy;
    if (defaultExecTypeId) projectSettings.defaultExecType = { execTypeId: defaultExecTypeId } as ExecType;
    await this.projectSettingsRepo.save(projectSettings);
    return projectSettings;
  }
}
