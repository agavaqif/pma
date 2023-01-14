import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { KpService } from './kp.service';
import { CreateKpsDto } from './dto/create-kps.dto';
import { UpdateKpDto } from './dto/update-kp.dto';
import { BatchUpdateKpsDto } from './dto/batch-update-kps.dto';

@Controller('api/project/:projectId/kp')
export class KpController {
  constructor(private readonly kpService: KpService) {}

  @Post()
  create(@Body() createKpsDto: CreateKpsDto, @Param('projectId') projectId: string) {
    return this.kpService.createKps(+projectId, createKpsDto);
  }

  @Get()
  findAllByProjectId(@Param('projectId') projectId: string) {
    return this.kpService.findAllByProjectId(+projectId);
  }

  @Patch('batch')
  updateBatch(@Param('projectId') projectId: string, @Body() updateKpsDto: BatchUpdateKpsDto) {
    return this.kpService.updateBatch(+projectId, updateKpsDto);
  }

  @Get(':kpId')
  findOne(@Param('kpId') kpId: string) {
    return this.kpService.findOne(+kpId);
  }

  @Patch(':kpId')
  update(@Param('kpId') kpId: string, @Body() updateKpDto: UpdateKpDto) {
    return this.kpService.update(+kpId, updateKpDto);
  }

  @Delete(':kpId')
  remove(@Param('kpId') kpId: string) {
    return this.kpService.removeAll();
    return this.kpService.remove(+kpId);
  }
}
