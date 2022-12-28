import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateMqStepDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsNumber()
  weight: number;
}
