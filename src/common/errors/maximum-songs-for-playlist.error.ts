import { DomainError } from 'src/common/errors/domain.error'; // Import the base class

export class ReachedMaximumSongLimitForPlaylistError extends DomainError {
  constructor(
    id?: string,
    message: string = 'Reached maximum song limit for playlist',
  ) {
    const finalMessage = id
      ? `Reached maximum song limit for playlist with id: ${id}`
      : message;
    super(finalMessage, 422); // 422 is the HTTP status code for "Unprocessable Entity"
  }
}
