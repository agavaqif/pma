import { Test, TestingModule } from '@nestjs/testing';
import { StepNoteService } from './step-note.service';

describe('StepNoteService', () => {
  let service: StepNoteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StepNoteService],
    }).compile();

    service = module.get<StepNoteService>(StepNoteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
