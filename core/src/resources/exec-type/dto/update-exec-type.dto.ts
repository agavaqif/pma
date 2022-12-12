import { PartialType } from '@nestjs/mapped-types';
import { CreateExecTypeDto } from './create-exec-type.dto';

export class UpdateExecTypeDto extends PartialType(CreateExecTypeDto) {}
