import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Req,
} from '@nestjs/common';
import { SYMBOLS } from 'src/common/symbols';
import IFriendRequestService from '../interfaces/friend-request.service.interface';
import SendFriendRequestDto from '../dto/send-friend-request.dto';
import { RequestWithEmail } from 'src/common/interfaces/request-with-user.interface';
import { IUsersService } from 'src/api/users/application/interfaces/users.service.interface';

@Controller('friend-request')
export class FriendRequestController {
  constructor(
    @Inject(SYMBOLS.FRIEND_REQUEST_SERVICE)
    private readonly friendRequestService: IFriendRequestService,
    @Inject(SYMBOLS.USERS_SERVICE) private readonly usersService: IUsersService,
  ) {}

  @Get()
  async getPendingFriendRequests(@Req() request: RequestWithEmail) {
    const { email } = request.user;
    const user = await this.usersService.getUserByEmail(email);

    return this.friendRequestService.getPendingFriendRequests(user.id);
  }

  @Post()
  async sendRequest(
    @Req() request: RequestWithEmail,
    @Body() data: SendFriendRequestDto,
  ) {
    const { email } = request.user;
    const user = await this.usersService.getUserByEmail(email);

    const { receiverId } = data;

    return this.friendRequestService.sendRequest(receiverId, user.id);
  }

  @Post(':id/accept')
  async acceptRequest(
    @Param('id') id: string,
    @Req() request: RequestWithEmail,
  ) {
    const { email } = request.user;
    const user = await this.usersService.getUserByEmail(email);

    return this.friendRequestService.acceptRequest(id, user.id);
  }

  @Post(':id/reject')
  async rejectRequest(
    @Param('id') id: string,
    @Req() request: RequestWithEmail,
  ) {
    const { email } = request.user;
    const user = await this.usersService.getUserByEmail(email);

    return this.friendRequestService.rejectRequest(id, user.id);
  }
}
