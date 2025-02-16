import { Injectable } from '@nestjs/common';
import IPlaylistsService from '../../application/interfaces/playlists.service.interface';
import { PlaylistVisibility, Playlist } from '../models/playlist.model';

@Injectable()
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

  updatePlaylistDetails(
    id: string,
    name: string,
    description: string,
  ): Promise<Playlist> {
    throw new Error('Method not implemented.');
  }

  updatePlaylistVisibility(visibility: PlaylistVisibility): Promise<Playlist> {
    throw new Error('Method not implemented.');
  }

  deletePlaylist(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }

  getPlaylist(id: string): Promise<Playlist> {
    throw new Error('Method not implemented.');
  }
}
