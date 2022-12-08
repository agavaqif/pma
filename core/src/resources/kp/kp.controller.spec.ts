import { Test, TestingModule } from '@nestjs/testing';
import { KpController } from './kp.controller';
import { KpService } from './kp.service';

describe('KpController', () => {
  let controller: KpController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [KpController],
      providers: [KpService],
    }).compile();

    controller = module.get<KpController>(KpController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
