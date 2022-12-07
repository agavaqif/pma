import { IsNotEmpty } from 'class-validator';

export class CreateGreetingDto {
  @IsNotEmpty()
  content: string;
}
