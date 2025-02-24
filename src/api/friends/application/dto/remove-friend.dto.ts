import { IsNotEmpty, IsString, Length } from 'class-validator';

/**
 * Data transfer object for removing a friend.
 * This class defines the structure of the request body required
 * to remove a friend from the user's list of friends.
 */
export default class RemoveFriendDto {
  /**
   * The unique identifier (ID) of the friend to be removed.
   *
   * This should be a 24-character string representing the friend's user ID.
   * It is validated to ensure it is a non-empty string of exactly 24 characters.
   *
   * @example "60b8b24185b3bc001c8f532f"
   *
   * @type {string}
   * @memberof RemoveFriendDto
   */
  @IsString()
  @IsNotEmpty()
  @Length(24, 24)
  friendId: string;
}
