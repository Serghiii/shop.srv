import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';

describe('UserController', () => {
  let controller: UserController;
  const mockUserRepository = () => ({
    find: jest.fn(),
    findOne: jest.fn(),
    findOneOrFail: jest.fn(),
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService,
        { provide: 'JwtService', useValue: 'mocJwtService' }
      ],
      controllers: [UserController],
    })
      .overrideProvider(UserService)
      .useValue(mockUserRepository)
      .compile();
    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
