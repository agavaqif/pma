import { Test, TestingModule } from '@nestjs/testing';
import { IsCompletedController } from './is-completed.controller';
import { IsCompletedService } from './is-completed.service';

describe('IsCompletedController', () => {
  let controller: IsCompletedController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IsCompletedController],
      providers: [IsCompletedService],
    }).compile();

    controller = module.get<IsCompletedController>(IsCompletedController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
