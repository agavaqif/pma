import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MqService } from './mq.service';
import { CreateMqDto } from './dto/create-mq.dto';
import { UpdateMqDto } from './dto/update-mq.dto';

@Controller('api/project/:projectId/mq')
export class MqController {
  constructor(private readonly mqService: MqService) {}

  @Post()
  create(@Body() createMqDto: CreateMqDto) {
    return this.mqService.create(createMqDto);
  }

  @Get()
  findAll() {
    return this.mqService.findAll();
  }

  @Get(':mqId')
  findOne(@Param('mqId') mqId: string) {
    return this.mqService.findOne(+mqId);
  }

  @Patch(':mqId')
  update(@Param('mqId') mqId: string, @Body() updateMqDto: UpdateMqDto) {
    return this.mqService.update(+mqId, updateMqDto);
  }

  @Delete(':mqId')
  remove(@Param('mqId') mqId: string) {
    return this.mqService.remove(+mqId);
  }
}
