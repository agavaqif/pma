import { Controller, Get, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { CompleteStepDto } from './dto/complete-step.dto';
import { IsCompletedService } from './is-completed.service';

@Controller('api/isCompleted')
export class IsCompletedController {
  constructor(private readonly isCompletedService: IsCompletedService) {}

  @Get('findAll')
  findAll(@Query('projectId') projectId: number, @Query('kpId') kpId: number, @Query('mqId') mqId: number, @Query('stepId') stepId: number) {
    return this.isCompletedService.findAll({ projectId, kpId, mqId, stepId });
  }

  @Get(':isCompletedId')
  findOne(@Param('isCompletedId') isCompletedId: string) {
    return this.isCompletedService.findOne(+isCompletedId);
  }

  @Patch(':isCompletedId/complete')
  update(@Param('isCompletedId') isCompletedId: string, @Body() isCompleted: CompleteStepDto) {
    return this.isCompletedService.complete(+isCompletedId, isCompleted);
  }

  @Delete(':isCompletedId')
  remove(@Param('isCompletedId') isCompletedId: string) {
    return this.isCompletedService.delete(+isCompletedId);
  }
}
