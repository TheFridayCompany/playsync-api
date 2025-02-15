import { DomainError } from 'src/common/errors/domain.error'; // Import the base class

export class InvalidObjectIdError extends DomainError {
  constructor(message: string = 'Invalid Object ID') {
    super(message, 400); // 400 is the HTTP status code for "Bad Request"
  }
}
