import { IsBoolean, IsNotEmpty } from 'class-validator';

export class UpdateIsCompletedDto {
  @IsBoolean()
  @IsNotEmpty()
  isCompleted: boolean;
}
