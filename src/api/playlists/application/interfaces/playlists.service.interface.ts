import { User } from 'src/api/users/domain/models/user.model';
import {
  Playlist,
  PlaylistVisibility,
} from '../../domain/models/playlist.model';

export default interface IPlaylistsService {
  /**
   * Retrieves the playlist songs service instance associated with the user.
   * @param user - The user whose playlist songs service will be retrieved.
   * @returns An instance of the `IPlaylistsService` for the user's playlists.
   */
  forUser(user: User): IPlaylistsService;

  /**
   * Creates a new playlist.
   * @param name - The name of the playlist.
   * @param description - A brief description of the playlist.
   * @param userId - The ID of the user creating the playlist.
   * @param collaboratorIds - An array of user IDs who are collaborators on the playlist.
   * @param visibility - The visibility setting of the playlist (public/private).
   * @returns A promise that resolves to the created Playlist.
   */
  createPlaylist(
    name: string,
    description: string,
    collaboratorIds: string[],
    visibility: PlaylistVisibility,
  ): Promise<Playlist>;

  /**
   * Deletes an existing playlist.
   * @param id - The ID of the playlist to delete.
   * @returns A promise that resolves when the playlist is deleted.
   */
  deletePlaylist(id: string): Promise<void>;

  /**
   * Retrieves a playlist by its ID.
   * @param id - The ID of the playlist to retrieve.
   * @returns A promise that resolves to the Playlist object.
   */
  getPlaylist(id: string): Promise<Playlist>;

  /**
   * Retrieves a playlists for a user.
   * @param userId - The ID of the owner / collaborator.
   * @returns A promise that resolves to the list of Playlist object.
   */
  getPlaylists(userId?: string): Promise<Playlist[]>;

  /**
   * Updates details of a playlist.
   * @param id - The ID of the playlist to retrieve.
   * @param name - The updated name of the playlist.
   * @param description - The updated description of the playlist.
   * @returns A promise that resolves to the Playlist object.
   */
  updatePlaylistDetails(
    id: string,
    name: string,
    description: string,
  ): Promise<Playlist>;

  /**
   * Updates visibility of a playlist.
   * @param id - The ID of the playlist to retrieve.
   * @param visibility - The visibility of the playlist.
   * @returns A promise that resolves to the Playlist object.
   */
  updatePlaylistVisibility(
    id: string,
    visibility: PlaylistVisibility,
  ): Promise<Playlist>;
}
