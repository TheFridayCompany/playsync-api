import { DomainError } from 'src/common/errors/domain.error'; // Import the base class

export class UserNotFoundError extends DomainError {
  constructor(id?: string, message: string = 'User not found') {
    super(id ? `User with id ${id} not found` : message, 404); // 404 is the HTTP status code for "Not Found"
  }
}
