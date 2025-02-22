import { DomainError } from 'src/common/errors/domain.error'; // Import the base class

export class CollaboratorNotFoundError extends DomainError {
  constructor(
    id?: string,
    message: string = 'Collaborator not found on playlist',
  ) {
    const finalMessage = id
      ? `Collaborator with id ${id} not found on playlist`
      : message;
    super(finalMessage, 404); // 404 is the HTTP status code for "Not Found"
  }
}
