import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';

import { ExecTypeService } from './exec-type.service';
import { CreateExecTypeDto } from './dto/create-exec-type.dto';
import { UpdateExecTypeDto } from './dto/update-exec-type.dto';

@Controller('api/project/:projectId/execType')
export class ExecTypeController {
  constructor(private readonly execTypeService: ExecTypeService) {}

  @Post()
  create(@Body() createExecTypeDto: CreateExecTypeDto, @Param('projectId') projectId: string) {
    return this.execTypeService.create(createExecTypeDto, +projectId);
  }

  @Get()
  findAllByProjectId(@Param('projectId') projectId: string) {
    return this.execTypeService.findAllByProjectId(+projectId);
  }

  @Get(':execTypeId')
  findOne(@Param('execTypeId') execTypeId: string) {
    return this.execTypeService.findOne(+execTypeId);
  }

  @Patch(':execTypeId')
  update(@Param('execTypeId') execTypeId: string, @Body() updateExecTypeDto: UpdateExecTypeDto) {
    return this.execTypeService.update(+execTypeId, updateExecTypeDto);
  }

  @Patch(':execTypeId/connectMq/:mqId')
  addMq(@Param('projectId') projectId: string, @Param('execTypeId') execTypeId: string, @Param('mqId') mqId: string) {
    return this.execTypeService.addMq(+projectId, +execTypeId, +mqId);
  }

  @Patch(':execTypeId/disconnectMq/:mqId')
  removeMq(@Param('execTypeId') execTypeId: string, @Param('mqId') mqId: string) {
    return this.execTypeService.removeMq(+execTypeId, +mqId);
  }

  @Delete(':execTypeId')
  remove(@Param('execTypeId') execTypeId: string) {
    return this.execTypeService.remove(+execTypeId);
  }
}
