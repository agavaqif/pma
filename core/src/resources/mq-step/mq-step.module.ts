import { Module } from '@nestjs/common';
import { MqStepService } from './mq-step.service';
import { MqStepController } from './mq-step.controller';
import { MqStep } from './entities/mq-step.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IsCompletedModule } from '../is-completed/is-completed.module';

@Module({
  imports: [TypeOrmModule.forFeature([MqStep]), IsCompletedModule],
  controllers: [MqStepController],
  providers: [MqStepService],
  exports: [MqStepService],
})
export class MqStepModule {}
