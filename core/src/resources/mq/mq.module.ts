import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MqService } from './mq.service';
import { MqController } from './mq.controller';
import { Mq } from './entities/mq.entity';
import { MqStepModule } from '../mq-step/mq-step.module';
import { MqStep } from '../mq-step/entities/mq-step.entity';
import { IsCompletedModule } from '../is-completed/is-completed.module';

@Module({
  imports: [TypeOrmModule.forFeature([Mq, MqStep]), MqStepModule, IsCompletedModule],
  controllers: [MqController],
  providers: [MqService],
  exports: [MqService],
})
export class MqModule {}
