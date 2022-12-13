import { Test, TestingModule } from '@nestjs/testing';
import { MqController } from './mq.controller';
import { MqService } from './mq.service';

describe('MqController', () => {
  let controller: MqController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MqController],
      providers: [MqService],
    }).compile();

    controller = module.get<MqController>(MqController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
