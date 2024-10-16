import { Test, TestingModule } from '@nestjs/testing';
import { SubgroupController } from './subgroup.controller';

describe('SubgroupController', () => {
  let controller: SubgroupController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SubgroupController],
    }).compile();

    controller = module.get<SubgroupController>(SubgroupController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
