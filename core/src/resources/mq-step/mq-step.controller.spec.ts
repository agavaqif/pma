import { Test, TestingModule } from '@nestjs/testing';
import { MqStepController } from './mq-step.controller';
import { MqStepService } from './mq-step.service';

describe('MqStepController', () => {
  let controller: MqStepController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MqStepController],
      providers: [MqStepService],
    }).compile();

    controller = module.get<MqStepController>(MqStepController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
