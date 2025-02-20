import { Song } from '../../domain/models/song.model';

export default interface ISongSearchService {
  search(query: string): Promise<Song[]>;

  findOneById(id: string): Promise<Song>;
}
