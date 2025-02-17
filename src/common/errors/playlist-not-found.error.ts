import { DomainError } from 'src/common/errors/domain.error';

export class PlaylistNotFoundError extends DomainError {
  constructor(id?: string, message: string = 'Playlist not found') {
    const finalMessage = id ? `Playlist with id ${id} not found` : message;
    super(finalMessage, 404); // 404 is the HTTP status code for "NotFound"
  }
}
