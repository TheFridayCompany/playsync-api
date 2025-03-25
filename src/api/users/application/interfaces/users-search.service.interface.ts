import { User } from '../../domain/models/user.model';

/**
 * Interface for a service responsible for searching users.
 *
 * This service provides a method to search users based on their username.
 */
export default interface IUsersSearchService {
  /**
   * Retrieves the playlist songs service instance associated with the user.
   * @param user - The user whose playlist songs service will be retrieved.
   * @returns An instance of the `IUsersSearchService`.
   */
  forUser(user: User): IUsersSearchService;

  /**
   * Searches for users based on a username query.
   *
   * @param {string} usernameQuery - The username query to search for.
   * @returns {Promise<User[]>} A promise that resolves to an array of matching users.
   *
   * @example
   * const users = await userService.searchByUsername('john_doe');
   * console.log(users); // An array of User objects matching 'john_doe'
   */
  searchByUsername(usernameQuery: string): Promise<User[]>;
}
