import { Song } from '../models/song.model';
import { StreamingPlatforms } from '../models/streaming-platforms.enum';

/**
 * Interface for defining link generation strategies for different streaming platforms.
 * Implementing classes should provide the logic for generating a URL for a given song on a specific platform.
 */
export interface ILinkGenerationStrategy {
  /**
   * Generates a streaming platform link for a given song and platform.
   *
   * @param song - The song object containing details about the song.
   * @param streamingPlatform - The streaming platform for which the link should be generated.
   * @returns A string representing the generated URL for the song on the given streaming platform.
   */
  generateLink(song: Song, streamingPlatform: StreamingPlatforms): string;
}
