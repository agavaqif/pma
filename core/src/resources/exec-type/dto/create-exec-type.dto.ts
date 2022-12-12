import { IsNotEmpty } from 'class-validator';

export class CreateExecTypeDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  code: string;
}
