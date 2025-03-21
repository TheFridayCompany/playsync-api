import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Friendship } from '../../domain/models/friendship.model';
import IFriendshipRepository from '../../domain/interfaces/friendship.repository.interface';
import { IFriendship } from '../schema/friendship.mongo.schema';
import { convertStringIdToMongooseObjectId } from 'src/common/utils';
import { User } from 'src/api/users/domain/models/user.model';

@Injectable()
export class FriendshipMongoRepository implements IFriendshipRepository {
  constructor(
    @InjectModel(Friendship.name)
    private readonly friendshipSchema: mongoose.Model<IFriendship>,
  ) {}

  async add(userId: string, friendId: string): Promise<void> {
    await this.friendshipSchema.create({
      user1: convertStringIdToMongooseObjectId(userId),
      user2: convertStringIdToMongooseObjectId(friendId),
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  async findOne(userId: string, friendId: string): Promise<any | null> {
    const friendship = await this.friendshipSchema
      .findOne({
        $or: [
          {
            user1: convertStringIdToMongooseObjectId(userId),
            user2: convertStringIdToMongooseObjectId(friendId),
          },
          {
            user2: convertStringIdToMongooseObjectId(userId),
            user1: convertStringIdToMongooseObjectId(friendId),
          },
        ],
      })
      .populate<{ user1: any }>('user1')
      .populate<{ user2: any }>('user2');

    if (!friendship) return null;

    // Return the actual friend (not the given userId)
    return friendship.user1._id.toString() === userId
      ? friendship.user2
      : friendship.user1;
  }

  async getForUser(userId: string): Promise<User[]> {
    const response = await this.friendshipSchema
      .find({
        $or: [
          { user1: convertStringIdToMongooseObjectId(userId) },
          { user2: convertStringIdToMongooseObjectId(userId) },
        ],
      })
      .populate<{ user1: any }>('user1')
      .populate<{ user2: any }>('user2');

    const friends = response.map((friendship) => {
      return friendship.user1._id.toString() === userId.toString()
        ? this.toUserObject(friendship.user2)
        : this.toUserObject(friendship.user1);
    });

    return friends;
  }

  async remove(userId: string, friendId: string): Promise<void> {
    await this.friendshipSchema
      .deleteOne({
        $or: [
          {
            user1: convertStringIdToMongooseObjectId(userId),
            user2: convertStringIdToMongooseObjectId(friendId),
          },
          {
            user2: convertStringIdToMongooseObjectId(userId),
            user1: convertStringIdToMongooseObjectId(friendId),
          },
        ],
      })
      .exec();
  }

  private toUserObject(userDocument: mongoose.Document & User): User {
    if (!userDocument) return null;

    return new User(
      userDocument._id.toString(),
      userDocument.name,
      userDocument.username,
      userDocument.email,
    );
  }
}
