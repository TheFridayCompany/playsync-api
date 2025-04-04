import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { FriendRequest } from '../../domain/models/friend-request.model';
import IFriendRequestRepository from '../../domain/interfaces/friend-request.repository.interface';
import { IFriendRequest } from '../schema/friend-request.mongo.schema';
import {
  convertStringIdToMongooseObjectId,
  convertMongooseObjectIdToString,
} from 'src/common/utils';
import { IUsersService } from 'src/api/users/application/interfaces/users.service.interface';
import { SYMBOLS } from 'src/common/symbols';

export interface IFriendRequestMongoRepository
  extends IFriendRequestRepository {}

@Injectable()
export class FriendRequestMongoRepository
  implements IFriendRequestMongoRepository
{
  constructor(
    @InjectModel(FriendRequest.name)
    private readonly friendRequestModel: mongoose.Model<IFriendRequest>,
    @Inject(SYMBOLS.USERS_SERVICE)
    private readonly usersService: IUsersService,
  ) {}

  async findOne(
    senderId: string,
    receiverId: string,
    status: string = 'pending',
  ): Promise<FriendRequest | null> {
    const friendRequestModel = await this.friendRequestModel.findOne({
      $or: [
        {
          sender: convertStringIdToMongooseObjectId(senderId),
          receiver: convertStringIdToMongooseObjectId(receiverId),
        },
        {
          receiver: convertStringIdToMongooseObjectId(senderId),
          sender: convertStringIdToMongooseObjectId(receiverId),
        },
      ],
      status,
    });

    if (!friendRequestModel) {
      return null;
    }

    return this.toDomain(friendRequestModel);
  }

  async findOneById(requestId: string): Promise<FriendRequest> {
    const friendRequestModel = await this.friendRequestModel
      .findById(convertStringIdToMongooseObjectId(requestId))
      .exec();

    if (!friendRequestModel) {
      return null;
    }

    return this.toDomain(friendRequestModel);
  }

  async create(
    senderId: string,
    receiverId: string,
    status: string = 'pending',
  ): Promise<FriendRequest> {
    const response = await this.friendRequestModel.create({
      receiver: convertStringIdToMongooseObjectId(receiverId),
      sender: convertStringIdToMongooseObjectId(senderId),
      status,
    });

    return this.toDomain(response);
  }

  async update(requestId: string, status: string): Promise<FriendRequest> {
    const updatedFriendRequestModel = await this.friendRequestModel
      .findOneAndUpdate(
        { _id: convertStringIdToMongooseObjectId(requestId) },
        {
          status,
        },
        { new: true },
      )
      .exec();

    return this.toDomain(updatedFriendRequestModel);
  }

  async getForUser(
    userId: string,
    status: string = 'pending',
  ): Promise<FriendRequest[]> {
    const friendRequestModels = await this.friendRequestModel
      .find({
        $or: [
          {
            receiver: convertStringIdToMongooseObjectId(userId),
          },
          {
            sender: convertStringIdToMongooseObjectId(userId),
          },
        ],
        status,
      })
      .exec();

    return Promise.all(
      friendRequestModels.map((model) => this.toDomain(model)),
    );
  }

  private async toDomain(
    friendRequest: IFriendRequest,
  ): Promise<FriendRequest> {
    const {
      _id,
      sender: senderId,
      receiver: receiverId,
      status,
      createdAt,
      updatedAt,
    } = friendRequest;
    const sender = await this.usersService.getUser(senderId.toString());
    const receiver = await this.usersService.getUser(receiverId.toString());
    return new FriendRequest(
      convertMongooseObjectIdToString(_id),
      sender,
      receiver,
      status,
      createdAt,
      updatedAt,
    );
  }
}
