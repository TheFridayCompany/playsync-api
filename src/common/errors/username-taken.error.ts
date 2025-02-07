export class UsernameTakenError extends Error {
  statusCode: number;

  constructor(message: string = 'Username is already taken') {
    super(message);
    this.name = 'UsernameTakenError';
    this.statusCode = 409; // HTTP Status Code for "Conflict"

    // Ensuring that the prototype chain is set correctly
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
