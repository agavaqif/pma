import { Module } from '@nestjs/common';
import { KpService } from './kp.service';
import { KpController } from './kp.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Kp } from './entities/kp.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Kp])],
  controllers: [KpController],
  providers: [KpService],
})
export class KpModule {}
