import { DomainError } from 'src/common/errors/domain.error'; // Import the base class

export class CollaboratorAlreadyExistsError extends DomainError {
  constructor(
    id?: string,
    message: string = 'Collaborator already exists on playlist',
  ) {
    const finalMessage = id
      ? `Collaborator with id ${id} already exists on playlist`
      : message;
    super(finalMessage, 409);
  }
}
