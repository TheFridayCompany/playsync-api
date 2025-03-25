import { Song } from 'src/api/songs/domain/models/song.model';
import { Playlist, PlaylistVisibility } from '../models/playlist.model';
import { User } from 'src/api/users/domain/models/user.model';

/**
 * Interface for managing playlist-related operations in the repository layer.
 * Provides methods for creating, updating, retrieving, and deleting playlists,
 * as well as managing songs and collaborators within playlists.
 */
export default interface IPlaylistRepository {
  /**
   * Creates a new playlist.
   *
   * @param name - The name of the playlist.
   * @param description - The description of the playlist.
   * @param visibility - The visibility of the playlist (public/private).
   * @param userId - The user ID who is creating the playlist.
   * @returns The created playlist.
   */
  create(
    name: string,
    description: string,
    visibility: PlaylistVisibility,
    userId: string,
  ): Promise<Playlist>;

  /**
   * Finds a playlist by its ID.
   *
   * @param id - The ID of the playlist.
   * @returns The playlist or null if not found.
   */
  findOneById(id: string): Promise<Playlist | null>;

  /**
   * Finds all playlists for a specific user.
   *
   * @param userId - The ID of the user.
   * @param includeCollaborations - Whether to include collaborating playlists.
   * @param visibility - Optional filter for public/private created playlists.
   * @param collaborationVisibility - Optional filter for public/private collaborating playlists.
   * @returns A list of playlists for the user.
   */
  findForUser(
    userId: string,
    includeCollaborations: boolean,
    visibility?: PlaylistVisibility[],
    collaborationVisibility?: PlaylistVisibility[],
  ): Promise<Playlist[]>;

  /**
   * Updates a playlist's details.
   *
   * @param id - The ID of the playlist to update.
   * @param name - The new name of the playlist.
   * @param description - The new description of the playlist.
   * @param visibility - The new visibility of the playlist (public/private).
   * @returns The updated playlist.
   */
  update(
    id: string,
    name: string,
    description: string,
    visibility: PlaylistVisibility,
  ): Promise<Playlist>;

  /**
   * Deletes a playlist by its ID.
   *
   * @param id - The ID of the playlist to delete.
   * @returns The deleted playlist.
   */
  delete(id: string): Promise<Playlist>;

  /**
   * Adds a song to a playlist.
   *
   * @param id - The ID of the playlist to add the song to.
   * @param song - The song to add to the playlist.
   * @returns The updated playlist.
   */
  addSong(id: string, song: Song): Promise<Playlist>;

  /**
   * Removes a song from a playlist.
   *
   * @param id - The ID of the playlist to remove the song from.
   * @param songId - The ID of the song to remove from the playlist.
   * @returns The updated playlist.
   */
  removeSong(id: string, songId: string): Promise<Playlist>;

  /**
   * Adds a collaborator to a playlist.
   *
   * @param id - The ID of the playlist to add the collaborator to.
   * @param collaboratorId - The ID of the user to add as a collaborator.
   * @returns The updated playlist.
   */
  addCollaborator(id: string, collaboratorId: string): Promise<Playlist>;

  /**
   * Removes a collaborator from a playlist.
   *
   * @param id - The ID of the playlist to remove the collaborator from.
   * @param collaboratorId - The ID of the collaborator to remove from the playlist.
   * @returns The updated playlist.
   */
  removeCollaborator(id: string, collaboratorId: string): Promise<Playlist>;
}
