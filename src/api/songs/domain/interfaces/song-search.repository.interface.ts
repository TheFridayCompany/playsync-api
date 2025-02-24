import { Song } from '../models/song.model';

/**
 * Interface for interacting with the song search repository.
 * Provides methods to find songs based on a query or by their ID.
 */
export default interface ISongSearchRepository {
  /**
   * Finds songs based on a search query.
   *
   * @param query The search query to use for finding songs.
   * @returns A promise that resolves to an array of matching songs.
   */
  find(query: string): Promise<Song[]>;

  /**
   * Finds a song by its unique identifier.
   *
   * @param id The unique identifier of the song.
   * @returns A promise that resolves to the song if found, or null if no song is found.
   */
  findById(id: string): Promise<Song | null>;
}
