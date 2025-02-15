import { DomainError } from 'src/common/errors/domain.error'; // Import the base class

export class UsernameTakenError extends DomainError {
  constructor(message: string = 'Username is already taken') {
    super(message, 409); // 409 is the HTTP status code for "Conflict"
  }
}
