import { Module } from '@nestjs/common';
import { MqService } from './mq.service';
import { MqController } from './mq.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Mq } from './entities/mq.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Mq])],
  controllers: [MqController],
  providers: [MqService],
})
export class MqModule {}
