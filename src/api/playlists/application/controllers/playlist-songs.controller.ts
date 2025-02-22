import { Body, Controller, Delete, Inject, Param, Post } from '@nestjs/common';
import { SYMBOLS } from 'src/common/symbols';
import IPlaylistSongsService from '../interfaces/playlist-songs.service.interface';
import { IUsersService } from 'src/api/users/application/interfaces/users.service.interface';

@Controller('playlists')
export class PlaylistSongsController {
  private readonly userId: string = '67aab02f833f69d4e6bf7d23'; // id for rohanddave username

  constructor(
    @Inject(SYMBOLS.USERS_SERVICE) private readonly usersService: IUsersService,
    @Inject(SYMBOLS.PLAYLIST_SONGS_SERVICE)
    private readonly playlistSongService: IPlaylistSongsService,
  ) {}

  @Post(':playlistId/song/:songId')
  async addSongToPlaylist(
    @Param('playlistId') playlistId: string,
    @Param('songId') songId: string,
  ) {
    const user = await this.usersService.getUser(this.userId);

    console.log(songId);
    return this.playlistSongService.forUser(user).addSong(playlistId, songId);
  }

  @Delete(':playlistId/song/:songId')
  async removeSongFromPlaylist(
    @Param('playlistId') playlistId: string,
    @Param('songId') songId: string,
  ) {
    const user = await this.usersService.getUser(this.userId);

    return this.playlistSongService
      .forUser(user)
      .removeSong(playlistId, songId);
  }
}
