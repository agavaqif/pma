import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';

import { MqStepService } from './mq-step.service';
import { UpdateMqStepDto } from './dto/update-mq-step.dto';
import { CreateMqStepsDto } from './dto/create-mq-steps.dto';

@Controller('api/project/:projectId/kp/:kpId/mq/:mqId/steps')
export class MqStepController {
  constructor(private readonly mqStepService: MqStepService) {}

  @Post()
  create(@Body() { mqSteps }: CreateMqStepsDto, @Param('kpId') kpId: string, @Param('mqId') mqId: string) {
    return mqSteps.map((step) => this.mqStepService.create(+kpId, +mqId, step));
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
