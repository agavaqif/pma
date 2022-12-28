import { Test, TestingModule } from '@nestjs/testing';
import { MqStepService } from './mq-step.service';

describe('MqStepService', () => {
  let service: MqStepService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MqStepService],
    }).compile();

    service = module.get<MqStepService>(MqStepService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
