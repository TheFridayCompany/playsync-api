import { User } from 'src/api/users/domain/models/user.model';
import { Friendship } from '../models/friendship.model';

/**
 * Interface for the Friendship Repository.
 * Provides methods for managing friendships between users.
 */
export default interface IFriendshipRepository {
  /**
   * Retrieves a list of friendships for a specific user.
   *
   * @param {string} userId - The ID of the user whose friendships are being retrieved.
   * @returns {Promise<Friendship[]>} - A promise that resolves to an array of friendships.
   */
  getForUser(userId: string): Promise<User[]>;

  /**
   * Removes a friendship between two users.
   *
   * @param {string} userId - The ID of one user in the friendship.
   * @param {string} friendId - The ID of the other user in the friendship.
   * @returns {Promise<void>} - A promise that resolves when the friendship is removed.
   */
  remove(userId: string, friendId: string): Promise<void>;

  /**
   * Adds a new friendship between two users.
   *
   * @param {string} userId - The ID of one user in the friendship.
   * @param {string} friendId - The ID of the other user in the friendship.
   * @returns {Promise<void>} - A promise that resolves when the friendship is added.
   */
  add(userId: string, friendId: string): Promise<void>;

  /**
   * Finds a friendship between two users.
   *
   * @param {string} userId - The ID of one user in the friendship.
   * @param {string} friendId - The ID of the other user in the friendship.
   * @returns {Promise<Friendship | null>} - A promise that resolves to the friendship if found, otherwise null.
   */
  findOne(userId: string, friendId: string): Promise<Friendship | null>;
}
