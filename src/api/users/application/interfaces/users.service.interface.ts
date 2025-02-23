import { User } from '../../domain/models/user.model';

/**
 * Interface for the Users Service
 * Provides methods to manage users.
 */
export interface IUsersService {
  /**
   * Creates a new user with the given username and name.
   *
   * If the username is already taken, a {@link UsernameTakenError} will be thrown.
   *
   * @param {string} username - The username of the user to create.
   * @param {string} name - The name of the user to create.
   * @returns {Promise<User>} The newly created user.
   * @throws {UsernameTakenError} If the username is already taken.
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
   */
  deleteUser(id: string): Promise<void>;

  /**
   * Retrieves the user with the given id.
   *
   * If the user is not found, a {@link UserNotFoundError} will be thrown.
   *
   * @param {string} id - The id of the user to retrieve.
   * @returns {Promise<User>} The user with the given id.
   * @throws {UserNotFoundError} If the user with the given id does not exist.
   */
  getUser(id: string): Promise<User>;
}
