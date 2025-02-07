import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { IUsersService } from '../interfaces/users.service.interface';
import { SYMBOLS } from 'src/common/symbols';
import CreateUserDto from '../dto/create-user.dto';
import { User } from '../../domain/models/user.model';
import { UserNotFoundError } from 'src/common/errors/user-not-found.error';

describe('UsersController', () => {
  let controller: UsersController;
  let usersServiceMock: IUsersService;

  beforeEach(async () => {
    usersServiceMock = {
      createUser: jest.fn(),
      getUser: jest.fn(),
      deleteUser: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: SYMBOLS.USERS_SERVICE,
          useValue: usersServiceMock,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a user', async () => {
    const dto: CreateUserDto = { username: 'testuser', name: 'Test User' };
    const createdUser = new User('generated-id', dto.username, dto.name);
    (usersServiceMock.createUser as jest.Mock).mockResolvedValue(createdUser);

    const result = await controller.create(dto);

    expect(usersServiceMock.createUser).toHaveBeenCalledWith(
      dto.username,
      dto.name,
    );
    expect(result).toEqual(createdUser);
  });

  it('should return a user by ID', async () => {
    const user = new User('user-id', 'testuser', 'Test User');
    (usersServiceMock.getUser as jest.Mock).mockResolvedValue(user);

    const result = await controller.getUser('user-id');

    expect(usersServiceMock.getUser).toHaveBeenCalledWith('user-id');
    expect(result).toEqual(user);
  });

  it('should throw UserNotFoundError when user is not found', async () => {
    (usersServiceMock.getUser as jest.Mock).mockRejectedValue(
      new UserNotFoundError('user-id'),
    );

    await expect(controller.getUser('user-id')).rejects.toThrow(
      UserNotFoundError,
    );
    expect(usersServiceMock.getUser).toHaveBeenCalledWith('user-id');
  });

  it('should delete a user', async () => {
    (usersServiceMock.deleteUser as jest.Mock).mockResolvedValue(undefined);

    await expect(controller.deleteUser('user-id')).resolves.toBeUndefined();
    expect(usersServiceMock.deleteUser).toHaveBeenCalledWith('user-id');
  });
});
