import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../../domain/services/users.service';
import { SYMBOLS } from 'src/common/symbols';
import { UserMongooseRepository } from './user.mongo.repository';
import IRepository from 'src/common/interfaces/repository.interface';
import { User } from '../../domain/models/user.model';
import { getModelToken } from '@nestjs/mongoose';
import mongoose from 'mongoose';

describe('UserMongooseRepository', () => {
  let repository: IRepository<User>;

  const mockUser = {
    _id: new mongoose.Types.ObjectId().toString(),
    name: 'John Doe',
    username: 'johndoe',
  };

  const mockUserModel = {
    new: jest.fn().mockImplementation((data) => ({
      ...data,
      save: jest.fn().mockResolvedValue(mockUser),
    })),
    constructor: jest.fn(),
    findById: jest.fn().mockReturnValue({
      exec: jest.fn().mockResolvedValue(mockUser),
    }),
    find: jest.fn().mockReturnValue({
      exec: jest.fn().mockResolvedValue([mockUser]),
    }),
    findByIdAndUpdate: jest.fn().mockReturnValue({
      exec: jest.fn().mockResolvedValue(mockUser),
    }),
    findByIdAndDelete: jest.fn().mockReturnValue({
      exec: jest.fn().mockResolvedValue(mockUser),
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [],
      providers: [
        {
          provide: SYMBOLS.USERS_REPOSITORY,
          useClass: UserMongooseRepository,
        },
        {
          provide: getModelToken(User.name),
          useValue: mockUserModel,
        },
      ],
    }).compile();

    repository = module.get<IRepository<User>>(SYMBOLS.USERS_REPOSITORY);
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });
});
