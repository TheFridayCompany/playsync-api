import ISongsService from '../../application/interfaces/songs.service.interface';
import Song from '../models/song.model';

export default class SongsService implements ISongsService {
  createSong(name: string, duration: number, artist: string): Promise<Song> {
    const song = new Song(1, name, duration, artist);
    throw new Error('Method not implemented.');
  }

  deleteSong(id: number): Promise<void> {
    throw new Error('Method not implemented.');
  }

  getSong(id: number): Promise<Song> {
    throw new Error('Method not implemented.');
  }
}
