export class UserNotFoundError extends Error {
  statusCode: number;

  constructor(id?: string, message: string = 'User not found') {
    super(id ? `User with id ${id} not found` : 'User not found');
    this.name = 'UserNotFoundError';
    this.statusCode = 404; // HTTP Status Code for "Not Found"

    // Ensuring that the prototype chain is set correctly
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
