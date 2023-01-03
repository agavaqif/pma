import { Module } from '@nestjs/common';
import { IsCompletedService } from './is-completed.service';
import { IsCompletedController } from './is-completed.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IsCompleted } from './entities/is-completed.entity';

@Module({
  imports: [TypeOrmModule.forFeature([IsCompleted])],
  controllers: [IsCompletedController],
  providers: [IsCompletedService],
  exports: [IsCompletedService],
})
export class IsCompletedModule {}
