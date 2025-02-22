import { Song } from '../models/song.model';

export default interface ISongSearchRepository {
  find(query: string): Promise<Song[]>;
  findById(id: string): Promise<Song | null>;
}
