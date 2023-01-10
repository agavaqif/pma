import { Module } from '@nestjs/common';
import { IsCompletedService } from './is-completed.service';
import { IsCompletedController } from './is-completed.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IsCompleted } from './entities/is-completed.entity';
import { StepNote } from '../step-note/entities/step-note.entity';

@Module({
  imports: [TypeOrmModule.forFeature([IsCompleted, StepNote])],
  controllers: [IsCompletedController],
  providers: [IsCompletedService],
  exports: [IsCompletedService],
})
export class IsCompletedModule {}
