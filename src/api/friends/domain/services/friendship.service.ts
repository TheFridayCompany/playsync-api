import { Inject, Injectable } from '@nestjs/common';
import { SYMBOLS } from 'src/common/symbols';
import IFriendshipService from '../../application/interfaces/friendship.service.interface';
import IFriendshipRepository from '../interfaces/friendship.repository.interface';
import { FriendNotFoundError } from 'src/common/errors/friend-not-found.error';
import { CannotFriendSelf } from 'src/common/errors/cannot-friend-self.error';
import { User } from 'src/api/users/domain/models/user.model';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class FriendshipService implements IFriendshipService {
  constructor(
    @Inject(SYMBOLS.FRIENDSHIP_REPOSITORY)
    private readonly friendshipRepository: IFriendshipRepository,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async checkFriendshipStatus(
    userId: string,
    friendId: string,
  ): Promise<boolean> {
    const areFriends =
      (await this.friendshipRepository.findOne(userId, friendId)) !== null;

    return areFriends;
  }

  addFriend(userId: string, friendId: string): Promise<void> {
    if (userId === friendId) {
      throw new CannotFriendSelf();
    }

    return this.friendshipRepository.add(userId, friendId);
  }

  async getFriends(userId: string): Promise<User[]> {
    return this.friendshipRepository.getForUser(userId);
  }

  async removeFriend(userId: string, friendId: string): Promise<void> {
    // check if the friendship exists; throw an error if not
    const friendship = await this.friendshipRepository.findOne(
      userId,
      friendId,
    );

    if (!friendship) {
      throw new FriendNotFoundError(friendId);
    }

    const response = await this.friendshipRepository.remove(userId, friendId);

    await Promise.all([
      this.eventEmitter.emitAsync('friend.removed', userId, friendId),
      this.eventEmitter.emitAsync('friend.removed', friendId, userId),
    ]);

    return response;
  }
}
