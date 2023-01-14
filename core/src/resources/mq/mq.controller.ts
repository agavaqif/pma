import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MqService } from './mq.service';
import { CreateMqDto } from './dto/create-mq.dto';
import { UpdateMqDto } from './dto/update-mq.dto';

@Controller('api/project/:projectId/mq')
export class MqController {
  constructor(private readonly mqService: MqService) {}

  @Post()
  create(@Body() createMqDto: CreateMqDto, @Param('projectId') projectId: string) {
    return this.mqService.create(createMqDto, +projectId);
  }

  @Get()
  findAllByProjectId(@Param('projectId') projectId: string) {
    return this.mqService.findAllByProjectId(+projectId);
  }

  @Get(':mqId')
  findOne(@Param('mqId') mqId: string) {
    return this.mqService.findOne(+mqId);
  }

  @Patch(':mqId')
  update(@Param('projectId') projectId: string, @Param('mqId') mqId: string, @Body() updateMqDto: UpdateMqDto) {
    const { stepsList } = updateMqDto;
    return this.mqService.update(+projectId, +mqId, { stepsList, ...updateMqDto });
  }

  @Delete(':mqId')
  remove(@Param('mqId') mqId: string) {
    return this.mqService.remove(+mqId);
  }
}
