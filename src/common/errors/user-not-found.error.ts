export class UserNotFoundError extends Error {
  statusCode: number;

  constructor(message: string = 'User not found') {
    super(message);
    this.name = 'UserNotFoundError';
    this.statusCode = 404; // HTTP Status Code for "Not Found"

    // Ensuring that the prototype chain is set correctly
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
