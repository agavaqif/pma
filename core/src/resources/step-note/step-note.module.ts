import { Module } from '@nestjs/common';
import { StepNoteService } from './step-note.service';
import { StepNoteController } from './step-note.controller';
import { StepNote } from './entities/step-note.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([StepNote])],
  controllers: [StepNoteController],
  providers: [StepNoteService],
})
export class StepNoteModule {}
