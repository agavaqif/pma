import { PartialType } from '@nestjs/mapped-types';
import { CreateKpsDto } from './create-kps.dto';

export class UpdateKpDto extends PartialType(CreateKpsDto) {}
