import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from './role.entity';
import { RoleService } from './role.service';


describe('RoleService', () => {

  type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

  let service: RoleService;
  let repository: MockRepository<Role>;
  const value = 'USER';
  const name = { name: 'USER' };
  const createRole = {
    name: 'USER',
    description: 'USER'
  }
  const mockRoleRepository = {
    save: jest.fn().mockImplementation(role => Promise.resolve({
      id: 1,
      ...role,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    })),
    findOneOrFail: jest.fn().mockImplementation(value => Promise.resolve({
      id: 1,
      name: 'USER',
      description: 'USER',
      createdAt: Date.now(),
      updatedAt: Date.now(),
    })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RoleService,
        {
          provide: getRepositoryToken(Role),
          useValue: mockRoleRepository
        }
      ],
    }).compile();

    service = module.get<RoleService>(RoleService);
    repository = module.get<MockRepository<Role>>(getRepositoryToken(Role));

  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create role', async () => {
    expect(await service.createRole(createRole)).toEqual({
      id: expect.any(Number),
      name: 'USER',
      description: 'USER',
      createdAt: expect.any(Number),
      updatedAt: expect.any(Number)
    });
    expect(repository.save).toHaveBeenCalledTimes(1);
    expect(repository.save).toHaveBeenCalledWith(createRole);
  });

  it('should get role', async () => {
    expect(await service.getRole(value)).toEqual({
      id: expect.any(Number),
      name: 'USER',
      description: 'USER',
      createdAt: expect.any(Number),
      updatedAt: expect.any(Number)
    });
    expect(repository.findOneOrFail).toHaveBeenCalledTimes(1);
    expect(repository.findOneOrFail).toHaveBeenCalledWith(name);
  });

});
