import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { IUniqueIdService } from '../../../../common/interfaces/unique-id.service.interface';
import { User } from '../models/user.model';
import { UsersSymbols } from '../../users.symbols';
import { CommonSymbols } from '../../../../common/common.symbols';
import IRepository from '../../../../common/interfaces/repository.interface';

describe('UsersService', () => {
  let service: UsersService;
  let userRepositoryMock: IRepository<User>;
  let uniqueIdServiceMock: IUniqueIdService;

  beforeEach(async () => {
    // Create mock implementations
    userRepositoryMock = {
      create: jest.fn(),
      findOne: jest.fn(),
      findAll: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };

    uniqueIdServiceMock = {
      generate: jest.fn().mockReturnValue('generated-uuid'),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: UsersSymbols.USERS_REPOSITORY,
          useValue: userRepositoryMock,
        },
        {
          provide: CommonSymbols.UUID_SERVICE,
          useValue: uniqueIdServiceMock,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new user with a unique ID', async () => {
    const username = 'testuser';
    const name = 'Test User';

    // Create user data object
    const user = new User('generated-uuid', username, name);

    // Mock the repository call to save the user
    (userRepositoryMock.create as jest.Mock).mockResolvedValue(user);

    // Call the service method
    const result = await service.createUser(username, name);

    // Assert UUID was generated and passed to the user creation
    expect(uniqueIdServiceMock.generate).toHaveBeenCalled();
    expect(result).toEqual(user);

    // Assert repository was called with correct user
    expect(userRepositoryMock.create).toHaveBeenCalledWith(user);
  });

  it('should throw an error if username already exists', async () => {
    const username = 'existinguser';
    const name = 'Existing User';

    // Mock repository to simulate an existing user with the same username
    (userRepositoryMock.findOne as jest.Mock).mockResolvedValue(
      new User('existing-id', username, name),
    );

    // Call the service method and assert it throws an error
    await expect(service.createUser(username, name)).rejects.toThrowError(
      'Username already taken',
    );
  });
});
