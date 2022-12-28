import { Controller, Get, Body, Patch, Param, Delete } from '@nestjs/common';
import { IsCompletedService } from './is-completed.service';
import { UpdateIsCompletedDto } from './dto/update-is-completed.dto';

@Controller('api/project/:projectId/kp/:kpId/mq/:mqId/isCompleted')
export class IsCompletedController {
  constructor(private readonly isCompletedService: IsCompletedService) {}

  @Get('findAllByKpId')
  findAllByKpId(@Param('kpId') kpId: string) {
    return this.isCompletedService.findAllByKpId(+kpId);
  }

  @Get('findAllByMqId')
  findAllByMqId(@Param('mqId') mqId: string) {
    return this.isCompletedService.findAllByMqId(+mqId);
  }

  @Get(':isCompletedId')
  findOne(@Param('isCompletedId') isCompletedId: string) {
    return this.isCompletedService.findOne(+isCompletedId);
  }

  @Patch(':isCompletedId')
  update(@Param('isCompletedId') isCompletedId: string, @Body() { isCompleted }: UpdateIsCompletedDto) {
    return this.isCompletedService.update(+isCompletedId, isCompleted);
  }

  @Delete(':isCompletedId')
  remove(@Param('isCompletedId') isCompletedId: string) {
    return this.isCompletedService.delete(+isCompletedId);
  }
}
