import { Controller, Delete, Inject, Param, Post, Req } from '@nestjs/common';
import { SYMBOLS } from 'src/common/symbols';
import IPlaylistSongsService from '../interfaces/playlist-songs.service.interface';
import { IUsersService } from 'src/api/users/application/interfaces/users.service.interface';
import { RequestWithEmail } from 'src/common/interfaces/request-with-user.interface';

@Controller('playlists')
export class PlaylistSongsController {
  constructor(
    @Inject(SYMBOLS.USERS_SERVICE) private readonly usersService: IUsersService,
    @Inject(SYMBOLS.PLAYLIST_SONGS_SERVICE)
    private readonly playlistSongService: IPlaylistSongsService,
  ) {}

  @Post(':playlistId/song/:songId')
  async addSongToPlaylist(
    @Req() request: RequestWithEmail,
    @Param('playlistId') playlistId: string,
    @Param('songId') songId: string,
  ) {
    const { email } = request.user;
    const user = await this.usersService.getUserByEmail(email);

    return this.playlistSongService.forUser(user).addSong(playlistId, songId);
  }

  @Delete(':playlistId/song/:songId')
  async removeSongFromPlaylist(
    @Req() request: RequestWithEmail,
    @Param('playlistId') playlistId: string,
    @Param('songId') songId: string,
  ) {
    const { email } = request.user;
    const user = await this.usersService.getUserByEmail(email);

    return this.playlistSongService
      .forUser(user)
      .removeSong(playlistId, songId);
  }
}
