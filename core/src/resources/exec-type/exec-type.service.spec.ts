import { Test, TestingModule } from '@nestjs/testing';
import { ExecTypeService } from './exec-type.service';

describe('ExecTypeService', () => {
  let service: ExecTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExecTypeService],
    }).compile();

    service = module.get<ExecTypeService>(ExecTypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
