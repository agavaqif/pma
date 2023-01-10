import { IsEnum, IsOptional } from 'class-validator';
import { KpUnit } from 'src/shared/enums/kp-unit.enum';

export class ProjectSettingsDto {
  @IsOptional()
  @IsEnum(KpUnit)
  kpUnit: KpUnit;

  @IsOptional()
  accuracy: number;

  @IsOptional()
  defaultExecTypeId: number;
}
