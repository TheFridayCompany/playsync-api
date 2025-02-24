import { Song } from '../models/song.model';

/**
 * Interface for generating streaming platform links for songs.
 * Implementing classes should define the logic for generating a URL to a streaming platform.
 */
export default interface IStreamingPlatformLinkBuilder {
  /**
   * Generates a streaming platform link for a given song.
   *
   * @param song - The song object containing details about the song.
   * @returns A string representing the generated URL to a streaming platform for the song.
   */
  generate(song: Song): string;
}
