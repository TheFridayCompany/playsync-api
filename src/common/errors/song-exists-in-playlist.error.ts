import { DomainError } from 'src/common/errors/domain.error'; // Import the base class

export class SongExistsInPlaylistError extends DomainError {
  constructor(
    id?: string,
    message: string = 'Song already exists in playlist',
  ) {
    const finalMessage = id
      ? `Song with ${id} already exists in playlist`
      : message;
    super(finalMessage, 409); // 409 is the HTTP status code for "Conflict"
  }
}
