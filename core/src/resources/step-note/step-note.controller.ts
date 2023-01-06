import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { StepNoteService } from './step-note.service';
import { CreateStepNoteDto } from './dto/create-step-note.dto';

@Controller('api/isCompleted/:isCompleted/stepNote')
export class StepNoteController {
  constructor(private readonly stepNoteService: StepNoteService) {}

  @Post()
  create(@Param('isCompleted') isCompletedId: string, @Body() createStepNoteDto: CreateStepNoteDto) {
    return this.stepNoteService.create(+isCompletedId, createStepNoteDto);
  }

  @Get()
  findAll(@Param('isCompleted') isCompletedId: string) {
    return this.stepNoteService.findAllByIsCompletedId(+isCompletedId);
  }

  @Get(':noteId')
  findOne(@Param('noteId') noteId: string) {
    return this.stepNoteService.findOne(+noteId);
  }

  @Delete(':noteId')
  remove(@Param('noteId') noteId: string) {
    return this.stepNoteService.delete(+noteId);
  }
}
