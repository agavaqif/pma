import { IsNotEmpty, IsNumber, IsString, IsOptional } from 'class-validator';

export class CompleteStepDto {
  @IsNotEmpty()
  @IsNumber()
  crewId: number;

  @IsNotEmpty()
  @IsString()
  completedDate: string;

  @IsOptional()
  @IsString()
  note: string;
}
