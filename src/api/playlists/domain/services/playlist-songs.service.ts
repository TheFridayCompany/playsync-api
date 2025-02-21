import { Inject, Injectable } from '@nestjs/common';
import IPlaylistSongsService from '../../application/interfaces/playlist-songs.service.interface';
import ISongSearchService from 'src/api/songs/application/interfaces/song-search.service.interface';
import { SYMBOLS } from 'src/common/symbols';
import IPlaylistRepository from '../interfaces/playlist.repository.interface';
import IPlaylistsService from '../../application/interfaces/playlists.service.interface';
import { User } from 'src/api/users/domain/models/user.model';
import { Playlist } from '../models/playlist.model';
import { SongExistsInPlaylistError } from 'src/common/errors/song-exists-in-playlist.error';
import { ConfigService } from '@nestjs/config';
import { ReachedMaximumSongLimitForPlaylistError } from 'src/common/errors/maximum-songs-for-playlist.error';

@Injectable()
export default class PlaylistSongsService implements IPlaylistSongsService {
  private user: User;

  private readonly MAX_PLAYLIST_SONG_COUNT: number;

  constructor(
    @Inject(SYMBOLS.SONG_SEARCH_SERVICE)
    private readonly songSearchService: ISongSearchService,
    @Inject(SYMBOLS.PLAYLISTS_SERVICE)
    private readonly playlistsService: IPlaylistsService,
    @Inject(SYMBOLS.PLAYLISTS_REPOSITORY)
    private readonly playlistRepository: IPlaylistRepository,
    private readonly configService: ConfigService,
  ) {
    this.MAX_PLAYLIST_SONG_COUNT = this.configService.get<number>(
      'MAX_PLAYLIST_SONG_COUNT',
    );
  }

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

    if (playlist.songs.length >= this.MAX_PLAYLIST_SONG_COUNT) {
      throw new ReachedMaximumSongLimitForPlaylistError(playlist.id);
    }

    const song = await this.songSearchService.findOneById(songId);

    console.log('found song to be added');
    console.log(JSON.stringify(song));

    if (playlist.songs.some((song) => song.id === songId)) {
      throw new SongExistsInPlaylistError(songId);
    }

    return this.playlistRepository.addSong(playlist.id, song);
  }

  async removeSong(id: string, songId: string): Promise<Playlist> {
    const playlist = await this.playlistsService
      .forUser(this.user)
      .getPlaylist(id);

    const song = await this.songSearchService.findOneById(songId);

    console.log('found song to be added');
    console.log(JSON.stringify(song));

    return this.playlistRepository.removeSong(id, songId);
  }
}
