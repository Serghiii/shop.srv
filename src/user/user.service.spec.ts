import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Activation } from '../activation/activation.entity';
import { ActivationService } from '../activation/activation.service';
import { Ban } from '../ban/ban.entity';
import { BanService } from '../ban/ban.service';
import { MailService } from '../mail/mail.service';
import { Role } from '../role/role.entity';
import { RoleService } from '../role/role.service';
import { Connection, Repository } from 'typeorm';
import { UserDto } from './dto/user.dto';
import { User } from './user.entity';
import { UserService } from './user.service';

describe('UserService', () => {
  // type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

  let service: UserService;
  let connection;
  // let userRepository: MockRepository<User>;
  // let roleRepository: MockRepository<Role>;
  // let activationRepository: MockRepository<Activation>;
  // let banRepository: MockRepository<Ban>;

  const mockConnection = () => ({
    transaction: jest.fn()
  });
  const mockUserRepository = () => ({
    find: jest.fn(),
    findOne: jest.fn(),
    findOneOrFail: jest.fn(),
  });
  const mockRoleRepository = () => ({
    save: jest.fn(),
    findOneOrFail: jest.fn(),
  });
  const mockActivationRepository = () => ({
    save: jest.fn(),
    findOneOrFail: jest.fn(),
  });
  const mockBanRepository = () => ({
    save: jest.fn(),
    findOneOrFail: jest.fn(),
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository,
        },
        {
          provide: getRepositoryToken(Role),
          useValue: mockRoleRepository,
        },
        {
          provide: getRepositoryToken(Activation),
          useValue: mockActivationRepository,
        },
        {
          provide: getRepositoryToken(Ban),
          useValue: mockBanRepository,
        },
        {
          provide: Connection,
          useFactory: mockConnection,
        },
        UserService,
        RoleService,
        ActivationService,
        BanService,
        MailService
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    connection = module.get<Connection>(Connection);
    // userRepository = module.get<MockRepository<User>>(getRepositoryToken(User));
    // roleRepository = module.get<MockRepository<Role>>(getRepositoryToken(Role));
    // activationRepository = module.get<MockRepository<Activation>>(getRepositoryToken(Activation));
    // banRepository = module.get<MockRepository<Ban>>(getRepositoryToken(Ban));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createUser(dto: UserDto, role: string)', () => {
    const role: string = 'USER';
    const dto: UserDto = {
      name: 'Serg',
      phone: '+380633821941',
      email: 'mail@ukr.net',
      password: 'password'
    }
    const mockedManager = {
      create: jest.fn(),
      save: jest.fn()
    }

    it('should create a role', async () => {
      connection.transaction.mockImplementation((cb) => { cb(mockedManager) });
      await service.createUser(dto, role);

      expect(connection.transaction).toHaveBeenCalled();
      expect(mockedManager.create).toHaveBeenCalledWith(User);
      expect(mockedManager.create).toHaveBeenCalledTimes(1);
    });

  });

});