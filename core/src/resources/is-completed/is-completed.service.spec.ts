import { Test, TestingModule } from '@nestjs/testing';
import { IsCompletedService } from './is-completed.service';

describe('IsCompletedService', () => {
  let service: IsCompletedService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IsCompletedService],
    }).compile();

    service = module.get<IsCompletedService>(IsCompletedService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
