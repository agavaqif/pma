import { Module } from '@nestjs/common';
import { GreetingService } from './greeting.service';
import { GreetingController } from './greeting.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Greeting } from './entities/greeting.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Greeting])],
  controllers: [GreetingController],
  providers: [GreetingService],
})
export class GreetingModule {}
