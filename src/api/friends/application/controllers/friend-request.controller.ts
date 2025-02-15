import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { SYMBOLS } from 'src/common/symbols';
import IFriendRequestService from '../interfaces/friend-request.service.interface';
import SendFriendRequestDto from '../dto/send-friend-request.dto';
import AcceptFriendRequestDto from '../dto/accept-friend-request.dto';
import RejectFriendRequestDto from '../dto/reject-friend-request.dto';

@Controller('friend-request')
export class FriendRequestController {
  constructor(
    @Inject(SYMBOLS.FRIEND_REQUEST_SERVICE)
    private readonly friendRequestService: IFriendRequestService,
  ) {}

  @Get(':userId')
  getPendingFriendRequests(@Param('userId') id: string) {
    return this.friendRequestService.getPendingFriendRequests(id);
  }

  @Post()
  sendRequest(@Body() data: SendFriendRequestDto) {
    const { senderId, receiverId } = data;
    return this.friendRequestService.sendRequest(receiverId, senderId);
  }

  @Post(':id/accept')
  acceptRequest(@Param('id') id: string, @Body() data: AcceptFriendRequestDto) {
    const { receiverId } = data;
    return this.friendRequestService.acceptRequest(id, receiverId);
  }

  @Post(':id/reject')
  rejectRequest(@Param('id') id: string, @Body() data: RejectFriendRequestDto) {
    const { receiverId } = data;
    return this.friendRequestService.rejectRequest(id, receiverId);
  }
}
