import { Song } from '../models/song.model';
import { StreamingPlatforms } from '../models/streaming-platforms.enum';

export interface ILinkGenerationStrategy {
  generateLink(song: Song, streamingPlatform: StreamingPlatforms): string;
}
