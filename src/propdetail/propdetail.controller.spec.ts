import { Test, TestingModule } from '@nestjs/testing';
import { PropdetailController } from './propdetail.controller';

describe('PropdetailController', () => {
  let controller: PropdetailController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PropdetailController],
    }).compile();

    controller = module.get<PropdetailController>(PropdetailController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
