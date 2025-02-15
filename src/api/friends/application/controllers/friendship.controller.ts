import { Body, Controller, Delete, Get, Inject, Param } from '@nestjs/common';
import { SYMBOLS } from 'src/common/symbols';
import IFriendshipService from '../interfaces/friendship.service.interface';
import RemoveFriendDto from '../dto/remove-friend.dto';

@Controller('friendship')
export class FriendshipController {
  constructor(
    @Inject(SYMBOLS.FRIENDSHIP_SERVICE)
    private readonly friendshipService: IFriendshipService,
  ) {}

  @Get(':userId')
  getFriends(@Param('userId') userId: string) {
    // TODO: fix user id
    return this.friendshipService.getFriends(userId);
  }

  @Delete()
  removeFriend(@Body() data: RemoveFriendDto) {
    const { friendId, userId } = data;
    return this.friendshipService.removeFriend(userId, friendId);
  }
}
