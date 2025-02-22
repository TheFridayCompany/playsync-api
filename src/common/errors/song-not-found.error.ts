import { DomainError } from 'src/common/errors/domain.error'; // Import the base class

export class SongNotFoundError extends DomainError {
  constructor(id?: string, message: string = 'Song not found') {
    const finalMessage = id ? `Song with ${id} not found` : message;
    super(finalMessage, 404); // 404 is the HTTP status code for "NotFound"
  }
}
