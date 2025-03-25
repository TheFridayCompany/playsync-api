import { User } from 'src/api/users/domain/models/user.model';
import { Playlist } from '../../domain/models/playlist.model';

export default interface IPlaylistSongsService {
  /**
   * Retrieves the playlist songs service instance associated with the user.
   * @param user - The user whose playlist songs service will be retrieved.
   * @returns An instance of the `IPlaylistSongsService` for the user's playlists.
   */
  forUser(user: User): IPlaylistSongsService;

  /**
   * Adds a song to a playlist.
   * @param id - The ID of the playlist.
   * @param songId - ID of a song to be added.
   * @returns A promise that resolves when the songs are added.
   */
  addSong(id: string, songId: string): Promise<Playlist>;

  /**
   * Removes songs from a playlist.
   * @param id - The ID of the playlist.
   * @param songId - ID of song to be removed.
   * @returns A promise that resolves when the songs are removed.
   */
  removeSong(id: string, songId: string): Promise<Playlist>;
}
