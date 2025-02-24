import { Inject, Injectable } from '@nestjs/common';
import { SYMBOLS } from 'src/common/symbols';
import IFriendshipService from '../../application/interfaces/friendship.service.interface';
import { User } from 'src/api/users/domain/models/user.model';
import IFriendshipRepository from '../interfaces/friendship.repository.interface';
import { FriendNotFoundError } from 'src/common/errors/friend-not-found.error';
import { CannotFriendSelf } from 'src/common/errors/cannot-friend-self.error';
import { Friendship } from '../models/friendship.model';

@Injectable()
export class FriendshipService implements IFriendshipService {
  constructor(
    @Inject(SYMBOLS.FRIENDSHIP_REPOSITORY)
    private readonly friendshipRepository: IFriendshipRepository,
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

  getFriends(userId: string): Promise<Friendship[]> {
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

    // delete friend
    return this.friendshipRepository.remove(userId, friendId);
  }
}
