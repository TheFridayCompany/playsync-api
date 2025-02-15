import { DomainError } from 'src/common/errors/domain.error'; // Import the base class

export class CannotFriendSelf extends DomainError {
  constructor(message: string = 'Cannot add yourself as a friend') {
    super(message, 400); // 400 is the HTTP status code for "BadRequest"
  }
}
