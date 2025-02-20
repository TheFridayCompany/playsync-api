import { Inject, Injectable } from '@nestjs/common';
import IPlaylistSongsService from '../../application/interfaces/playlist-songs.service.interface';
import ISongSearchService from 'src/api/songs/application/interfaces/song-search.service.interface';
import { SYMBOLS } from 'src/common/symbols';
import IPlaylistRepository from '../interfaces/playlist.repository.interface';
import IPlaylistsService from '../../application/interfaces/playlists.service.interface';
import { User } from 'src/api/users/domain/models/user.model';
import { Playlist } from '../models/playlist.model';

@Injectable()
export default class PlaylistSongsService implements IPlaylistSongsService {
  private user: User;

  constructor(
    @Inject(SYMBOLS.SONG_SEARCH_SERVICE)
    private readonly songSearchService: ISongSearchService,
    @Inject(SYMBOLS.PLAYLISTS_SERVICE)
    private readonly playlistsService: IPlaylistsService,
    @Inject(SYMBOLS.PLAYLISTS_REPOSITORY)
    private readonly playlistRepository: IPlaylistRepository,
  ) {}

  forUser(user: User): IPlaylistSongsService {
    this.user = user;
    return this;
  }

  async addSong(id: string, songId: string): Promise<Playlist> {
    const playlist = await this.playlistsService
      .forUser(this.user)
      .getPlaylist(id);

    console.log('found playlist');
    console.log(JSON.stringify(playlist));

    const song = await this.songSearchService.findOneById(songId);

    console.log('found song to be added');
    console.log(JSON.stringify(song));

    return this.playlistRepository.addSong(playlist.id, song);
  }

  async removeSong(id: string, songId: string): Promise<Playlist> {
    const playlist = await this.playlistsService
      .forUser(this.user)
      .getPlaylist(id);

    throw new Error('Method not implemented.');
  }
}
