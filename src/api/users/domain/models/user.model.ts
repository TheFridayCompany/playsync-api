/**
 * Represents a user in the system.
 *
 * This class encapsulates the essential information about a user, including their
 * unique identifier, name, username, and email.
 */
export class User {
  /**
   * The unique identifier of the user.
   * @type {string}
   */
  id: string;

  /**
   * The name of the user.
   * @type {string}
   */
  name: string;

  /**
   * The username of the user, which is unique within the system.
   * @type {string}
   */
  username: string;

  /**
   * The email address of the user.
   * @type {string}
   */
  email: string;

  /**
   * Creates a new User instance.
   *
   * @param {string} id - The unique identifier for the user.
   * @param {string} name - The name of the user.
   * @param {string} username - The username of the user.
   * @param {string} email - The email address of the user.
   */
  constructor(id: string, name: string, username: string, email: string) {
    this.id = id;
    this.name = name;
    this.username = username;
    this.email = email;
  }
}
