import { Test, TestingModule } from '@nestjs/testing';
import { StepNoteController } from './step-note.controller';
import { StepNoteService } from './step-note.service';

describe('StepNoteController', () => {
  let controller: StepNoteController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StepNoteController],
      providers: [StepNoteService],
    }).compile();

    controller = module.get<StepNoteController>(StepNoteController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
