import { IsNotEmpty, IsString, Length } from 'class-validator';

/**
 * Data transfer object for sending a friend request.
 * This class defines the structure of the request body required
 * to send a friend request to another user.
 */
export default class SendFriendRequestDto {
  /**
   * The unique identifier (ID) of the user receiving the friend request.
   *
   * This should be a 24-character string representing the receiver's user ID.
   * It is validated to ensure it is a non-empty string of exactly 24 characters.
   *
   * @example "60b8b24185b3bc001c8f532f"
   *
   * @type {string}
   * @memberof SendFriendRequestDto
   */
  @IsString()
  @IsNotEmpty()
  @Length(24, 24)
  receiverId: string;
}
