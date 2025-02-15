import { DomainError } from 'src/common/errors/domain.error'; // Import the base class

export class ExistingPendingFriendRequestError extends DomainError {
  constructor(id?: string, message: string = 'Already sent friend request') {
    const finalMessage = id
      ? `Already sent user with ${id} a friend request`
      : message;
    super(finalMessage, 403); // 403 is the HTTP status code for "Forbidden"
  }
}
