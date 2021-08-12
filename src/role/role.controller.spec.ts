import { Test, TestingModule } from '@nestjs/testing';
import { RoleController } from './role.controller';
import { RoleService } from './role.service';

describe('RoleController', () => {
  let controller: RoleController;
  const mockRoleService = {
    createRole: jest.fn(dto => ({
      id: 1,
      ...dto,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    })),
    getRole: jest.fn().mockImplementation((name) => ({
      id: 1,
      name: 'USER',
      description: 'USER',
      createdAt: Date.now(),
      updatedAt: Date.now(),
    })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RoleService],
      controllers: [RoleController],
    })
      .overrideProvider(RoleService)
      .useValue(mockRoleService)
      .compile();

    controller = module.get<RoleController>(RoleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create role', () => {
    const dto = { name: 'USER', description: 'USER' };
    expect(controller.create(dto)).toEqual({
      id: expect.any(Number),
      name: 'USER',
      description: 'USER',
      createdAt: expect.any(Number),
      updatedAt: expect.any(Number)
    })
    expect(mockRoleService.createRole).toHaveBeenCalledWith(dto)
  })

  it('should get role', () => {
    const roleName = 'USER'
    expect(controller.getByValue(roleName)).toEqual({
      id: expect.any(Number),
      name: 'USER',
      description: 'USER',
      createdAt: expect.any(Number),
      updatedAt: expect.any(Number)
    })
    expect(mockRoleService.getRole).toHaveBeenCalledWith(roleName)
  })

});
