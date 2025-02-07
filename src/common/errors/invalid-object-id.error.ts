export class InvalidObjectIdError extends Error {
  statusCode: number;

  constructor(message: string = 'Invalid Object ID') {
    super(message);
    this.name = 'InvalidObjectIdError';
    this.statusCode = 400; // HTTP Status Code for "Bad Request"

    // Ensuring that the prototype chain is set correctly
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
