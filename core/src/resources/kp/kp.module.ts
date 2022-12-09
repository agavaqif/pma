import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { KpController } from './kp.controller';
import { KpService } from './kp.service';
import { Kp } from './entities/kp.entity';
import { Project } from '../project/entities/project.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Kp, Project])],
  controllers: [KpController],
  providers: [KpService],
})
export class KpModule {}
