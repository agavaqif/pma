import { IsNotEmpty, IsString } from 'class-validator';

export class CreateStepNoteDto {
  @IsNotEmpty()
  @IsString()
  note: string;
}
