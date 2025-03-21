import { User } from 'src/api/users/domain/models/user.model';

/**
 * Interface for Friendship Service that provides methods to manage friendships between users.
 */
export default interface IFriendshipService {
  /**
   * Retrieves the list of friends for a given user.
   *
   * @param {string} userId - The ID of the user whose friends are being fetched.
   * @returns {Promise<User[]>} - A promise that resolves to an array of Friendship objects.
   */
  getFriends(userId: string): Promise<User[]>;

  /**
   * Removes a friend from a user's friend list.
   *
   * @param {string} userId - The ID of the user who wants to remove the friend.
   * @param {string} friendId - The ID of the friend to be removed.
   * @returns {Promise<void>} - A promise that resolves once the friend is removed.
   */
  removeFriend(userId: string, friendId: string): Promise<void>;

  /**
   * Adds a new friend to a user's friend list.
   *
   * @param {string} userId - The ID of the user who is adding a new friend.
   * @param {string} friendId - The ID of the friend being added.
   * @returns {Promise<void>} - A promise that resolves once the friend is added.
   */
  addFriend(userId: string, friendId: string): Promise<void>;

  /**
   * Checks the friendship status between two users.
   *
   * @param {string} userId - The ID of the first user.
   * @param {string} friendId - The ID of the second user to check the friendship status with.
   * @returns {Promise<boolean>} - A promise that resolves to `true` if the users are friends, otherwise `false`.
   */
  checkFriendshipStatus(userId: string, friendId: string): Promise<boolean>;
}
