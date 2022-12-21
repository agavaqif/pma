import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ExecTypeService } from './exec-type.service';
import { ExecTypeController } from './exec-type.controller';
import { ExecType } from './entities/exec-type.entity';
import { Kp } from '../kp/entities/kp.entity';
import { Mq } from '../mq/entities/mq.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ExecType, Kp, Mq])],
  controllers: [ExecTypeController],
  providers: [ExecTypeService],
})
export class ExecTypeModule {}
