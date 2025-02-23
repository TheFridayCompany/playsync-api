import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import IRepository from 'src/common/interfaces/repository.interface';
import { User } from '../models/user.model';
import { SYMBOLS } from 'src/common/symbols';
import { UserNotFoundError } from 'src/common/errors/user-not-found.error';

describe('UsersService', () => {
  let service: UsersService;
  let userRepositoryMock: IRepository<User>;
  let uniqueIdServiceMock: IUniqueIdService;

  beforeEach(async () => {
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
          provide: SYMBOLS.USERS_REPOSITORY,
          useValue: userRepositoryMock,
        },
        {
          provide: SYMBOLS.UUID_SERVICE,
          useValue: uniqueIdServiceMock,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should retrieve a user by ID', async () => {
    const id = 'user-id';
    const username = 'testuser';
    const name = 'Test User';
    const user = new User(id, username, name);

    (userRepositoryMock.findOne as jest.Mock).mockResolvedValue(user);

    const result = await service.getUser(id);

    expect(userRepositoryMock.findOne).toHaveBeenCalledWith(id);
    expect(result).toEqual(user);
  });

  it('should throw an error if user is not found', async () => {
    (userRepositoryMock.findOne as jest.Mock).mockResolvedValue(null);

    await expect(service.getUser('non-existing-id')).rejects.toThrow(
      UserNotFoundError,
    );
  });

  it('should delete a user by ID', async () => {
    (userRepositoryMock.delete as jest.Mock).mockResolvedValue(true);

    await expect(service.deleteUser('user-id')).resolves.toBeUndefined();
    expect(userRepositoryMock.delete).toHaveBeenCalledWith('user-id');
  });

  it('should throw an error if trying to delete a non-existing user', async () => {
    (userRepositoryMock.delete as jest.Mock).mockResolvedValue(false);

    await expect(service.deleteUser('non-existing-id')).rejects.toThrow(
      UserNotFoundError,
    );
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
    await expect(service.createUser(username, name)).rejects.toThrow(
      'Username already taken',
    );
  });
});
