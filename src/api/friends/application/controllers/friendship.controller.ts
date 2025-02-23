import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Req,
} from '@nestjs/common';
import { SYMBOLS } from 'src/common/symbols';
import IFriendshipService from '../interfaces/friendship.service.interface';
import RemoveFriendDto from '../dto/remove-friend.dto';
import { RequestWithEmail } from 'src/common/interfaces/request-with-user.interface';
import { IUsersService } from 'src/api/users/application/interfaces/users.service.interface';

@Controller('friendship')
export class FriendshipController {
  constructor(
    @Inject(SYMBOLS.FRIENDSHIP_SERVICE)
    private readonly friendshipService: IFriendshipService,
    @Inject(SYMBOLS.USERS_SERVICE)
    private readonly usersService: IUsersService,
  ) {}

  @Get()
  async getFriends(@Req() request: RequestWithEmail) {
    const { email } = request.user;
    const user = await this.usersService.getUserByEmail(email);

    return this.friendshipService.getFriends(user.id);
  }

  @Delete()
  async removeFriend(
    @Req() request: RequestWithEmail,
    @Body() data: RemoveFriendDto,
  ) {
    const { email } = request.user;
    const user = await this.usersService.getUserByEmail(email);

    const { friendId } = data;
    return this.friendshipService.removeFriend(user.id, friendId);
  }
}
