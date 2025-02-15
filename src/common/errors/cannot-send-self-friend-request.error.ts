import { DomainError } from 'src/common/errors/domain.error'; // Import the base class

export class CannotSendSelfFriendRequest extends DomainError {
  constructor(message: string = 'Cannot send yourself a friend request') {
    super(message, 400); // 400 is the HTTP status code for "BadRequest"
  }
}
