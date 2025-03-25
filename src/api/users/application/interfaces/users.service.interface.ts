import { User } from '../../domain/models/user.model';

/**
 * Interface for the Users Service.
 * Provides methods to manage user creation, retrieval, and deletion.
 */
export interface IUsersService {
  /**
   * Creates a new user with the given username, name, and email.
   *
   * If the username is already taken, a {@link UsernameTakenError} will be thrown.
   *
   * @param {string} username - The username of the user to create.
   * @param {string} name - The name of the user to create.
   * @param {string} email - The email address of the user to create.
   * @returns {Promise<User>} A promise that resolves to the newly created user.
   * @throws {UsernameTakenError} If the username is already taken.
   * @throws {EmailTakenError} If the email address is already taken.
   *
   * @example
   * const user = await userService.createUser('john_doe', 'John Doe', 'john@example.com');
   * console.log(user); // The newly created user object.
   */
  createUser(username: string, name: string, email: string): Promise<User>;

  /**
   * Deletes the user with the given id.
   *
   * If the user is not found, a {@link UserNotFoundError} will be thrown.
   *
   * @param {string} id - The id of the user to delete.
   * @returns {Promise<void>} Resolves once the user is deleted.
   * @throws {UserNotFoundError} If the user with the given id does not exist.
   *
   * @example
   * await userService.deleteUser('12345');
   * console.log('User deleted successfully');
   */
  deleteUser(id: string): Promise<void>;

  /**
   * Retrieves the user with the given id.
   *
   * If the user is not found, a {@link UserNotFoundError} will be thrown.
   *
   * @param {string} id - The id of the user to retrieve.
   * @returns {Promise<User>} A promise that resolves to the user with the given id.
   * @throws {UserNotFoundError} If the user with the given id does not exist.
   *
   * @example
   * const user = await userService.getUser('12345');
   * console.log(user); // The user object with id '12345'
   */
  getUser(id: string): Promise<User>;

  /**
   * Retrieves the user with the given email address.
   *
   * If the user is not found, a {@link UserNotFoundError} will be thrown.
   *
   * @param {string} email - The email address of the user to retrieve.
   * @returns {Promise<User>} A promise that resolves to the user with the given email.
   * @throws {UserNotFoundError} If the user with the given email does not exist.
   *
   * @example
   * const user = await userService.getUserByEmail('john@example.com');
   * console.log(user); // The user object with the email 'john@example.com'
   */
  getUserByEmail(email: string): Promise<User>;

  getUsers(ids: string[]): Promise<User[]>;
}
