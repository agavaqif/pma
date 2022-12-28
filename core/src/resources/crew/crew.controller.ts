import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CrewService } from './crew.service';
import { CreateCrewDto } from './dto/create-crew.dto';
import { UpdateCrewDto } from './dto/update-crew.dto';

@Controller('api/project/:projectId/crew')
export class CrewController {
  constructor(private readonly crewService: CrewService) {}

  @Post()
  create(@Body() createCrewDto: CreateCrewDto, @Param('projectId') projectId: string) {
    return this.crewService.create(+projectId, createCrewDto);
  }

  @Get()
  findCrewsByProjectId(@Param('projectId') projectId: string) {
    return this.crewService.findCrewsByProjectId(+projectId);
  }

  @Get(':crewId')
  findOne(@Param('crewId') crewId: string) {
    return this.crewService.findOne(+crewId);
  }

  @Patch(':crewId')
  update(@Param('crewId') crewId: string, @Body() updateCrewDto: UpdateCrewDto) {
    return this.crewService.update(+crewId, updateCrewDto);
  }

  @Delete(':crewId')
  remove(@Param('crewId') crewId: string) {
    return this.crewService.remove(+crewId);
  }
}
