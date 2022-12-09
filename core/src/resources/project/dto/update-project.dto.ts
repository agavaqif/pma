import { PartialType } from '@nestjs/mapped-types';
import { IsOptional } from 'class-validator';
import { ProjectSettings } from '../entities/project-settings.entity';
import { CreateProjectDto } from './create-project.dto';

export class UpdateProjectDto extends PartialType(CreateProjectDto) {
  @IsOptional()
  projectSettings: ProjectSettings;
}
