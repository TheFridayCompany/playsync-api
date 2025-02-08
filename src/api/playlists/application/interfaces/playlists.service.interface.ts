import {
  Playlist,
  PlaylistVisibility,
} from '../../domain/models/playlist.model';

export default interface IPlaylistsService {
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
    userId: string,
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
   * Adds songs to a playlist.
   * @param id - The ID of the playlist.
   * @param songIds - An array of song IDs to be added.
   * @returns A promise that resolves when the songs are added.
   */
  addSongs(id: string, songIds: number[]): Promise<void>;

  /**
   * Removes songs from a playlist.
   * @param id - The ID of the playlist.
   * @param songIds - An array of song IDs to be removed.
   * @returns A promise that resolves when the songs are removed.
   */
  removeSongs(id: string, songIds: number[]): Promise<void>;

  /**
   * Adds collaborators to a playlist.
   * @param id - The ID of the playlist.
   * @param collaboratorIds - An array of user IDs to be added as collaborators.
   * @returns A promise that resolves when collaborators are added.
   */
  addCollaborators(id: string, collaboratorIds: string[]): Promise<void>;

  /**
   * Sends a request to collaborate on a playlist.
   * @param id - The ID of the playlist.
   * @param collaboratorId - The ID of the user requesting collaboration.
   * @returns A promise that resolves when the request is sent.
   */
  requestCollaboration(id: string, collaboratorId: string): Promise<void>;

  /**
   * Removes collaborators from a playlist.
   * @param id - The ID of the playlist.
   * @param collaboratorIds - An array of user IDs to be removed as collaborators.
   * @returns A promise that resolves when collaborators are removed.
   */
  removeCollaborators(id: string, collaboratorIds: string[]): Promise<void>;

  /**
   * Accepts a collaboration request for a playlist.
   * @param id - The ID of the playlist.
   * @param collaboratorId - The ID of the user whose request is being accepted.
   * @returns A promise that resolves when the collaborator is added.
   */
  acceptCollaborator(id: string, collaboratorId: string): Promise<void>;

  /**
   * Rejects a collaboration request for a playlist.
   * @param id - The ID of the playlist.
   * @param collaboratorId - The ID of the user whose request is being rejected.
   * @returns A promise that resolves when the request is rejected.
   */
  rejectCollaborator(id: string, collaboratorId: string): Promise<void>;
}
