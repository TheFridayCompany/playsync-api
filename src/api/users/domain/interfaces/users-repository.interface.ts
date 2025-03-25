import IRepository from 'src/common/interfaces/repository.interface';
import { User } from '../models/user.model';

/**
 * Interface for the Users Repository.
 * Extends the general {@link IRepository} interface to provide user-specific repository methods.
 */
export default interface IUsersRepository extends IRepository<User> {
  /**
   * Finds users by their username.
   *
   * Returns an array of users whose username matches the query. If no user is found, returns an empty array.
   *
   * @param {string} usernameQuery - The username (or part of it) to search for.
   * @returns {Promise<User[]>} A promise that resolves to an array of users matching the username query.
   *
   * @example
   * const users = await usersRepository.findByUsername('john');
   * console.log(users); // Array of users with usernames matching 'john'.
   */
  findByUsername(usernameQuery: string): Promise<User[]>;

  /**
   * Finds a user by their email address.
   *
   * Returns the user that matches the given email. If no user is found, it will throw a {@link UserNotFoundError}.
   *
   * @param {string} email - The email address of the user to search for.
   * @returns {Promise<User>} A promise that resolves to the user with the given email.
   * @throws {UserNotFoundError} If the user with the given email does not exist.
   *
   * @example
   * const user = await usersRepository.findByEmail('john@example.com');
   * console.log(user); // The user with the email 'john@example.com'.
   */
  findByEmail(email: string): Promise<User>;

  /**
   * Retrieves a list of users based on multiple user IDs.
   * @param ids - An array of user IDs for which the corresponding users will be fetched.
   * @returns A promise that resolves with an array of `User` objects matching the provided IDs.
   */
  findManyByIds(ids: string[]): Promise<User[]>;
}
