import { DomainError } from 'src/common/errors/domain.error'; // Import the base class

export class FriendNotFoundError extends DomainError {
  constructor(id?: string, message: string = 'Friend not found') {
    const finalMessage = id ? `Friend with id ${id} not found` : message;
    super(finalMessage, 404); // 404 is the HTTP status code for "Not Found"
  }
}
