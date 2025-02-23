import { IsNotEmpty, IsString, Length } from 'class-validator';

export default class RemoveFriendDto {
  @IsString()
  @IsNotEmpty()
  @Length(24, 24)
  friendId: string;
}
