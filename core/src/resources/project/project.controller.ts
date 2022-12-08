import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Controller('api/project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post()
  create(@Body() createProjectDto: CreateProjectDto) {
    return this.projectService.create(createProjectDto);
  }

  @Get()
  findAll() {
    return this.projectService.findAll();
  }

  @Get(':projectId')
  findOne(@Param('projectId') projectId: string) {
    return this.projectService.findOne(+projectId);
  }

  @Patch(':projectId')
  update(@Param('projectId') projectId: string, @Body() updateProjectDto: UpdateProjectDto) {
    return this.projectService.update(+projectId, updateProjectDto);
  }

  @Delete(':projectId')
  remove(@Param('projectId') projectId: string) {
    return this.projectService.remove(+projectId);
  }
}
