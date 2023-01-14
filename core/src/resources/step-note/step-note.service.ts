import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IsCompleted } from '../is-completed/entities/is-completed.entity';
import { CreateStepNoteDto } from './dto/create-step-note.dto';
import { StepNote } from './entities/step-note.entity';

@Injectable()
export class StepNoteService {
  constructor(
    @InjectRepository(StepNote)
    private stepNoteRepository: Repository<StepNote>,
  ) {}

  async create(isCompletedId: number, createStepNoteDto: CreateStepNoteDto) {
    const stepNote = this.stepNoteRepository.create({ ...createStepNoteDto });
    stepNote.isCompleted = { isCompletedId } as IsCompleted;
    return await this.stepNoteRepository.save(stepNote);
  }

  async findAllByIsCompletedId(isCompletedId: number) {
    const stepNotes = await this.stepNoteRepository.find({ where: { isCompleted: { isCompletedId } } });
    return stepNotes;
  }

  async findOne(noteId: number) {
    const stepNote = await this.stepNoteRepository.findOne(noteId, { relations: ['isCompleted'] });
    return stepNote;
  }

  async delete(noteId: number) {
    const stepNote = await this.stepNoteRepository.findOne(noteId);
    return await this.stepNoteRepository.remove(stepNote);
  }
}
