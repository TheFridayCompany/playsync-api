import { DomainError } from 'src/common/errors/domain.error'; // Import the base class

export class CannotAddNonFriendAsCollaboratorError extends DomainError {
  constructor(
    message: string = 'Cannot add a user that is not a friend as a collaborator to playlist',
  ) {
    super(message, 400); // 400 is the HTTP status code for "BadRequest"
  }
}
