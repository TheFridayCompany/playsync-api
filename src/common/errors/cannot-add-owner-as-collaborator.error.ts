import { DomainError } from 'src/common/errors/domain.error'; // Import the base class

export class CannotAddOwnerAsCollaboratorError extends DomainError {
  constructor(
    message: string = 'Cannot add a owner as a collaborator to playlist',
  ) {
    super(message, 400); // 400 is the HTTP status code for "BadRequest"
  }
}
