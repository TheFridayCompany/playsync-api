import { Song } from '../../domain/models/song.model';

/**
 * Interface for searching and retrieving songs in the system.
 * Provides methods for searching songs by a query string and fetching a single song by its ID.
 */
export default interface ISongSearchService {
  /**
   * Searches for songs based on a query string.
   *
   * @param query - The search query to match against song titles, artists, or other relevant song data.
   * @returns A promise that resolves to an array of songs matching the search query.
   */
  search(query: string): Promise<Song[]>;

  /**
   * Retrieves a song by its unique identifier.
   *
   * @param id - The unique identifier of the song.
   * @returns A promise that resolves to the song with the given ID.
   */
  findOneById(id: string): Promise<Song>;
}
