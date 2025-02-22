import { DomainError } from 'src/common/errors/domain.error'; // Import the base class

export class ReachedMaximumCollaboratorsLimitForPlaylistError extends DomainError {
  constructor(
    id?: string,
    message: string = 'Reached maximum song collaborators for playlist',
  ) {
    const finalMessage = id
      ? `Reached maximum collaborators limit for playlist with id: ${id}`
      : message;
    super(finalMessage, 422); // 422 is the HTTP status code for "Unprocessable Entity"
  }
}
