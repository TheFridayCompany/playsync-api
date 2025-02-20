import { User } from 'src/api/users/domain/models/user.model';
import { Playlist } from '../../domain/models/playlist.model';

export default interface IPlaylistSongsService {
  forUser(user: User);

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
