import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from '../../domain/services/users.service';
import { SYMBOLS } from 'src/common/symbols';

describe('UsersController', () => {
  let controller: UsersController;
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: SYMBOLS.USERS_SERVICE,
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    usersService = module.get<UsersService>(SYMBOLS.USERS_SERVICE);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
