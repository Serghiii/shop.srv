import { Test, TestingModule } from '@nestjs/testing';
import { PropdetailService } from './propdetail.service';

describe('PropdetailService', () => {
  let service: PropdetailService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PropdetailService],
    }).compile();

    service = module.get<PropdetailService>(PropdetailService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
