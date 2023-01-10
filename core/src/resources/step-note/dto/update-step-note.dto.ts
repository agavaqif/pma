import { PartialType } from '@nestjs/mapped-types';
import { CreateStepNoteDto } from './create-step-note.dto';

export class UpdateStepNoteDto extends PartialType(CreateStepNoteDto) {}
