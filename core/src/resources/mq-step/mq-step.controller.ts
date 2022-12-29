import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';

import { MqStepService } from './mq-step.service';
import { UpdateMqStepDto } from './dto/update-mq-step.dto';
import { CreateMqStepDto } from './dto/create-mq-step.dto';

@Controller('api/project/:projectId/mq/:mqId/steps')
export class MqStepController {
  constructor(private readonly mqStepService: MqStepService) {}

  @Post()
  create(@Body() createMqStepDto: CreateMqStepDto, @Param('mqId') mqId: string) {
    return this.mqStepService.create(+mqId, createMqStepDto);
  }

  @Get()
  findAllByMqId(@Param('mqId') mqId: string) {
    return this.mqStepService.findAllByMqId(+mqId);
  }

  @Get(':stepId')
  findOne(@Param('stepId') stepId: string) {
    return this.mqStepService.findOne(+stepId);
  }

  @Patch(':stepId')
  update(@Param('stepId') stepId: string, @Body() updateMqStepDto: UpdateMqStepDto) {
    return this.mqStepService.update(+stepId, updateMqStepDto);
  }

  @Delete(':stepId')
  remove(@Param('stepId') stepId: string) {
    return this.mqStepService.remove(+stepId);
  }
}
