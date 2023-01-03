import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateMqStepDto {
  @IsNotEmpty()
  @IsNumber()
  order: number;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsNumber()
  weight: number;
}
