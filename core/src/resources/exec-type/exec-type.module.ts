import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ExecTypeService } from './exec-type.service';
import { ExecTypeController } from './exec-type.controller';
import { ExecType } from './entities/exec-type.entity';
import { Kp } from '../kp/entities/kp.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ExecType, Kp])],
  controllers: [ExecTypeController],
  providers: [ExecTypeService],
})
export class ExecTypeModule {}
