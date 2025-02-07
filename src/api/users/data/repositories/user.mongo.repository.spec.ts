import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from '../../domain/models/user.model';
import { InvalidObjectIdError } from 'src/common/errors/invalid-object-id.error';
import { UserMongooseRepository } from './user.mongo.repository';
import IRepository from 'src/common/interfaces/repository.interface';

describe('UserMongooseRepository', () => {
  let repository: IRepository<User>;
  let userModel: any;

  let mockId = new mongoose.Types.ObjectId().toString();
  const mockUser = {
    _id: mockId,
    name: 'Test User',
    username: 'testuser',
  };

  const mockUserObject: User = new User(mockId, 'Test User', 'testuser');

  beforeEach(async () => {
    userModel = {
      findById: jest.fn().mockReturnThis(),
      findByIdAndUpdate: jest.fn().mockReturnThis(),
      findByIdAndDelete: jest.fn().mockReturnThis(),
      find: jest.fn().mockReturnThis(),
      exec: jest.fn(),
      create: jest.fn(),
      save: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserMongooseRepository,
        {
          provide: getModelToken(User.name),
          useValue: userModel,
        },
      ],
    }).compile();

    repository = module.get<UserMongooseRepository>(UserMongooseRepository);
  });

  // TODO: how to mock new this.userModel(data) and user.save()?

  // it('should create a user', async () => {
  //   const result = await repository.create(mockUserObject);
  //   expect(userModel.save).toHaveBeenCalled();
  //   expect(result).toEqual(mockUser);
  // });

  it('should find one user by ID', async () => {
    userModel.findById.mockReturnValue({
      exec: jest.fn().mockResolvedValue(mockUser),
    });

    const result = await repository.findOne(mockUser._id);
    expect(userModel.findById).toHaveBeenCalledWith(
      expect.any(mongoose.Types.ObjectId),
    );
    expect(result).toEqual(mockUserObject);
  });

  it('should return null if user is not found', async () => {
    userModel.findById.mockReturnValue({
      exec: jest.fn().mockResolvedValue(null),
    });

    const result = await repository.findOne(
      new mongoose.Types.ObjectId().toString(),
    );

    expect(result).toBeNull();
  });

  it('should find all users', async () => {
    userModel.find.mockReturnValue({
      exec: jest.fn().mockResolvedValue([mockUser]),
    });

    const result = await repository.findAll();
    expect(userModel.find).toHaveBeenCalled();
    expect(result).toEqual([mockUserObject]);
  });

  // it('should update a user', async () => {
  //   const updatedUser = { ...mockUser, name: 'Updated Name' };
  //   userModel.findByIdAndUpdate.mockResolvedValue(updatedUser);
  //   const result = await repository.update(mockUser._id, updatedUser);
  //   expect(userModel.findByIdAndUpdate).toHaveBeenCalled();
  //   expect(result).toEqual(updatedUser);
  // });

  // it('should return null when updating a non-existing user', async () => {
  //   userModel.findByIdAndUpdate.mockResolvedValue(null);
  //   const result = await repository.update(mockUser._id, mockUser);
  //   expect(result).toBeNull();
  // });

  it('should delete a user', async () => {
    userModel.findByIdAndDelete.mockReturnValue({
      exec: jest.fn().mockResolvedValue(true),
    });
    const result = await repository.delete(mockUser._id);
    expect(userModel.findByIdAndDelete).toHaveBeenCalled();
    expect(result).toBe(true);
  });

  it('should return false if delete fails', async () => {
    userModel.findByIdAndDelete.mockReturnValue({
      exec: jest.fn().mockResolvedValue(false),
    });
    const result = await repository.delete(mockUser._id);
    expect(result).toBe(false);
  });

  it('should throw InvalidObjectIdError for invalid ObjectId', async () => {
    await expect(repository.findOne('invalid-id')).rejects.toThrow(
      InvalidObjectIdError,
    );
  });
});
