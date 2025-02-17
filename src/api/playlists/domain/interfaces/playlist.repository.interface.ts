import { Playlist } from '../models/playlist.model';

export default interface IPlaylistRepository {
  // TODO: implement parameters
  create(): Promise<Playlist>;

  findOneById(id: string): Promise<Playlist | null>;

  findForUser(userId: string): Promise<Playlist[]>;

  update(id: string): Promise<Playlist>;

  delete(id: string): Promise<Playlist>;
}
