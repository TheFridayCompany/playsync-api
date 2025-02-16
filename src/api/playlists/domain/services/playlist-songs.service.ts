import { Injectable } from '@nestjs/common';
import IPlaylistSongsService from '../../application/interfaces/playlist-songs.service.interface';

@Injectable()
export default class PlaylistSongsService implements IPlaylistSongsService {
  addSongs(id: string, songIds: number[]): Promise<void> {
    throw new Error('Method not implemented.');
  }
  removeSongs(id: string, songIds: number[]): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
