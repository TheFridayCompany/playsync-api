import { Playlist, PlaylistVisibility } from '../models/playlist.model';

export default interface IPlaylistRepository {
  // TODO: implement parameters
  create(
    name: string,
    description: string,
    visibility: PlaylistVisibility,
    userId: string,
  ): Promise<Playlist>;

  findOneById(id: string): Promise<Playlist | null>;

  findForUser(
    userId: string,
    includeCollaborations: boolean, // Whether to include collaborating playlists
    visibility?: PlaylistVisibility[], // Filter for public/private created playlists
    collaborationVisibility?: PlaylistVisibility[], // Filter for public/private collaborating playlists
  ): Promise<Playlist[]>;

  update(
    id: string,
    name: string,
    description: string,
    visibility: PlaylistVisibility,
  ): Promise<Playlist>;

  delete(id: string): Promise<Playlist>;
}
