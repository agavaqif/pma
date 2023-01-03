import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { KpController } from './kp.controller';
import { KpService } from './kp.service';
import { Kp } from './entities/kp.entity';
import { Project } from '../project/entities/project.entity';
import { ExecType } from '../exec-type/entities/exec-type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Kp, Project, ExecType])],
  controllers: [KpController],
  providers: [KpService],
  exports: [KpService],
})
export class KpModule {}
