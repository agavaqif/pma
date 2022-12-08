import { PartialType } from '@nestjs/mapped-types';
import { CreateKpDto } from './create-kps.dto';

export class UpdateKpDto extends PartialType(CreateKpDto) {}
