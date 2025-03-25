import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { SYMBOLS } from 'src/common/symbols';
import { User } from 'src/api/users/domain/models/user.model';
import IFriendRequestService from '../../application/interfaces/friend-request.service.interface';
import { FriendRequest } from '../models/friend-request.model';
import { FriendRequestNotFoundError } from 'src/common/errors/friend-request-not-found.error';
import IFriendRequestRepository from '../interfaces/friend-request.repository.interface';
import IFriendshipRepository from '../interfaces/friendship.repository.interface';
import { AlreadyFriendsError } from 'src/common/errors/already-friends.error';
import { ExistingPendingFriendRequestError } from 'src/common/errors/existing-friend-request.error';
import { IUsersService } from 'src/api/users/application/interfaces/users.service.interface';
import IFriendshipService from '../../application/interfaces/friendship.service.interface';
import { DomainError } from 'src/common/errors/domain.error';

@Injectable()
export class FriendRequestService implements IFriendRequestService {
  constructor(
    @Inject(SYMBOLS.FRIEND_REQUEST_REPOSITORY)
    private readonly friendRequestRepository: IFriendRequestRepository,
    @Inject(SYMBOLS.FRIENDSHIP_REPOSITORY)
    private readonly friendshipRepository: IFriendshipRepository,
    @Inject(SYMBOLS.USERS_SERVICE) private readonly usersService: IUsersService,
    @Inject(SYMBOLS.FRIENDSHIP_SERVICE)
    private readonly friendshipService: IFriendshipService,
  ) {}

  async sendRequest(
    receiverId: string,
    senderId: string,
  ): Promise<FriendRequest> {
    // check if sender and receiver is the same id
    if (receiverId === senderId) {
      // TODO: throw domain specific error
      throw new Error('Cannot send friend request to yourself');
    }

    // check if receiver is an existing user; this method throws error if user does not exist
    await this.usersService.getUser(receiverId);

    // check if they are already friends; throw error if they are already friends
    const existingFriend = await this.friendshipRepository.findOne(
      receiverId,
      senderId,
    );

    if (existingFriend) {
      throw new AlreadyFriendsError(receiverId);
    }

    // check if a friend request already exists for both ways i.e. (receiver, sender) or (sender, receiver); throw error if it does
    const existingPendingFriendRequest =
      await this.friendRequestRepository.findOne(
        senderId,
        receiverId,
        'pending',
      );

    if (existingPendingFriendRequest) {
      throw new ExistingPendingFriendRequestError(receiverId);
    }

    return this.friendRequestRepository.create(senderId, receiverId);
  }

  getPendingFriendRequests(userId: string): Promise<FriendRequest[]> {
    return this.friendRequestRepository.getForUser(userId);
  }

  async acceptRequest(requestId: string, userId: string): Promise<User> {
    const friendRequest =
      await this.findFriendRequestAndThrowErrorIfNotFound(requestId);

    // throw error if status is not pending
    if (friendRequest.status !== 'pending') {
      throw new DomainError('This request is not pending anymore;', 409);
    }

    await this.checkStatusAndUpdate(friendRequest, userId, 'accepted');

    console.log('finished updating friend request');

    try {
      await this.friendshipService.addFriend(userId, friendRequest.sender.id);
    } catch (e) {
      console.error('error adding friend; rolling back friend request status');
      console.error(e);
      // revert back to original status
      await this.checkStatusAndUpdate(
        friendRequest,
        userId,
        friendRequest.status,
      );
    }

    // TODO: return user somehow
    return this.usersService.getUser(friendRequest.sender.id);
  }

  async rejectRequest(requestId: string, userId: string): Promise<User> {
    const friendRequest =
      await this.findFriendRequestAndThrowErrorIfNotFound(requestId);

    // throw error if status is not pending
    if (friendRequest.status !== 'pending') {
      throw new DomainError('This request is not pending anymore;', 409);
    }

    await this.checkStatusAndUpdate(friendRequest, userId, 'rejected');

    // TODO: return user somehow
    return this.usersService.getUser(friendRequest.sender.id);
  }

  private async findFriendRequestAndThrowErrorIfNotFound(
    requestId: string,
  ): Promise<FriendRequest> {
    // find friend request; throw error if not found
    const friendRequest =
      await this.friendRequestRepository.findOneById(requestId);

    if (!friendRequest) {
      throw new FriendRequestNotFoundError();
    }

    return friendRequest;
  }

  private async checkStatusAndUpdate(
    friendRequest: FriendRequest,
    userId: string,
    status: string,
  ): Promise<FriendRequest> {
    // throw error if accepting user is not the receiver
    if (friendRequest.receiver.id !== userId) {
      throw new UnauthorizedException(
        "You can't accept or reject a friend request that is not addressed to you",
      );
    }

    // return early is status is the same
    if (friendRequest.status === status) {
      return friendRequest;
    }

    console.log(JSON.stringify(friendRequest));

    // update status of request
    return this.friendRequestRepository.update(friendRequest.id, status);
  }
}
