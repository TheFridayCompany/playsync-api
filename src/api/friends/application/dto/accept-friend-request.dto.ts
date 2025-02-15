import { IsNotEmpty, IsString, Length } from 'class-validator';

export default class AcceptFriendRequestDto {
  @IsString()
  @IsNotEmpty()
  @Length(24, 24)
  receiverId: string;
}
