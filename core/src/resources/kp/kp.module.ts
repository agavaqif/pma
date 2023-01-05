import { MqStep } from 'src/resources/mq-step/entities/mq-step.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { KpController } from './kp.controller';
import { KpService } from './kp.service';
import { Kp } from './entities/kp.entity';
import { Project } from '../project/entities/project.entity';
import { ExecType } from '../exec-type/entities/exec-type.entity';
import { IsCompletedModule } from '../is-completed/is-completed.module';
import { Mq } from '../mq/entities/mq.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Kp, Project, ExecType, MqStep, Mq]), IsCompletedModule],
  controllers: [KpController],
  providers: [KpService],
  exports: [KpService],
})
export class KpModule {}
