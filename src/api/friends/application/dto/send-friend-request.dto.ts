import { IsNotEmpty, IsString, Length } from 'class-validator';

export default class SendFriendRequestDto {
  @IsString()
  @IsNotEmpty()
  @Length(24, 24)
  receiverId: string;

  @IsString()
  @IsNotEmpty()
  @Length(24, 24)
  senderId: string;
}
