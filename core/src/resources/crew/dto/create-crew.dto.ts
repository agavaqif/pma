import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCrewDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  startDate: string;

  @IsOptional()
  endDate: string;

  @IsOptional()
  isActive: boolean;

  @IsOptional()
  mqId: number;
}
