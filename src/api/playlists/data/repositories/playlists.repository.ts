import { Injectable } from '@nestjs/common';
import IPlaylistRepository from '../../domain/interfaces/playlist.repository.interface';
import { Playlist } from '../../domain/models/playlist.model';

@Injectable()
export default class PlaylistMongoRepository implements IPlaylistRepository {
  create(): Promise<Playlist> {
    throw new Error('Method not implemented.');
  }
  findOneById(id: string): Promise<Playlist | null> {
    throw new Error('Method not implemented.');
  }
  findForUser(userId: string): Promise<Playlist[]> {
    throw new Error('Method not implemented.');
  }
  update(id: string): Promise<Playlist> {
    throw new Error('Method not implemented.');
  }
  delete(id: string): Promise<Playlist> {
    throw new Error('Method not implemented.');
  }
}
