import { Test, TestingModule } from '@nestjs/testing';
import { ProductpicsService } from './productpics.service';

describe('ProductpicsService', () => {
  let service: ProductpicsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductpicsService],
    }).compile();

    service = module.get<ProductpicsService>(ProductpicsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
