import Song from '../../domain/models/song.model';

export default interface ISongsService {
  createSong(name: string, duration: number, artist: string): Promise<Song>;

  deleteSong(id: number): Promise<void>;

  getSong(id: number): Promise<Song>;
}
