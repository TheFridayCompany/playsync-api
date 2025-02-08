import IPlaylistsService from '../../application/interfaces/playlists.service.interface';
import { PlaylistVisibility, Playlist } from '../models/playlist.model';

export default class PlaylistsService implements IPlaylistsService {
  createPlaylist(
    name: string,
    description: string,
    userId: string,
    collaboratorIds: string[],
    visibility: PlaylistVisibility,
  ): Promise<Playlist> {
    throw new Error('Method not implemented.');
  }

  deletePlaylist(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }

  getPlaylist(id: string): Promise<Playlist> {
    throw new Error('Method not implemented.');
  }

  addSongs(id: string, songIds: number[]): Promise<void> {
    throw new Error('Method not implemented.');
  }

  removeSongs(id: string, songIds: number[]): Promise<void> {
    throw new Error('Method not implemented.');
  }

  addCollaborators(id: string, collaboratorIds: string[]): Promise<void> {
    throw new Error('Method not implemented.');
  }

  requestCollaboration(id: string, collaboratorId: string): Promise<void> {
    throw new Error('Method not implemented.');
  }

  removeCollaborators(id: string, collaboratorIds: string[]): Promise<void> {
    throw new Error('Method not implemented.');
  }

  acceptCollaborator(id: string, collaboratorId: string): Promise<void> {
    throw new Error('Method not implemented.');
  }

  rejectCollaborator(id: string, collaboratorId: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
