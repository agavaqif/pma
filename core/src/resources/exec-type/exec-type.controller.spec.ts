import { Test, TestingModule } from '@nestjs/testing';
import { ExecTypeController } from './exec-type.controller';
import { ExecTypeService } from './exec-type.service';

describe('ExecTypeController', () => {
  let controller: ExecTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExecTypeController],
      providers: [ExecTypeService],
    }).compile();

    controller = module.get<ExecTypeController>(ExecTypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
