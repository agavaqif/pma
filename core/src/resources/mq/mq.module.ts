import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MqService } from './mq.service';
import { MqController } from './mq.controller';
import { Mq } from './entities/mq.entity';
import { MqStepModule } from '../mq-step/mq-step.module';
import { MqStep } from '../mq-step/entities/mq-step.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Mq, MqStep]), MqStepModule],
  controllers: [MqController],
  providers: [MqService],
})
export class MqModule {}
