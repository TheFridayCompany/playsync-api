import { Song } from 'src/api/songs/domain/models/song.model';

/**
 * Represents a playlist in the system.
 * A playlist includes basic information like name, description, and visibility,
 * along with a list of songs and collaborators associated with it.
 */
export class Playlist {
  /**
   * Creates an instance of a Playlist.
   *
   * @param id - The unique identifier of the playlist.
   * @param name - The name of the playlist.
   * @param description - The description of the playlist.
   * @param visibility - The visibility of the playlist (PUBLIC or PRIVATE).
   * @param userId - The ID of the user who created the playlist.
   * @param createdAt - The creation date of the playlist.
   * @param updatedAt - The last updated date of the playlist.
   * @param collaboratorIds - The IDs of users who are collaborators on the playlist.
   * @param songs - The songs included in the playlist.
   */
  constructor(
    public id: string,
    public name: string,
    public description: string,
    public visibility: PlaylistVisibility,
    public userId: string,
    public createdAt: Date,
    public updatedAt: Date,
    public collaboratorIds: string[] = [],
    public songs: Song[] = [],
  ) {}
}

/**
 * Enum representing the visibility options for a playlist.
 *
 * - PUBLIC: The playlist is visible to all users.
 * - PRIVATE: The playlist is only visible to the creator and collaborators.
 */
export enum PlaylistVisibility {
  PUBLIC = 'PUBLIC',
  PRIVATE = 'PRIVATE',
}
