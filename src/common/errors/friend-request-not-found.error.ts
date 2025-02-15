import { DomainError } from 'src/common/errors/domain.error'; // Import the base class

export class FriendRequestNotFoundError extends DomainError {
  constructor(id?: string, message: string = 'Friend request not found') {
    const finalMessage = id
      ? `Friend request with id ${id} not found`
      : message;
    super(finalMessage, 404); // 404 is the HTTP status code for "Not Found"
  }
}
