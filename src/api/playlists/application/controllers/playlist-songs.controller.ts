import { Controller, Inject } from '@nestjs/common';
import { SYMBOLS } from 'src/common/symbols';
import IPlaylistSongsService from '../interfaces/playlist-songs.service.interface';

@Controller('playlists/songs')
export class PlaylistSongsController {
  constructor(
    @Inject(SYMBOLS.PLAYLIST_SONGS_SERVICE)
    private readonly playlistSongsController: IPlaylistSongsService,
  ) {}

  //   @Post()
  //   create(@Body() createUserDto: CreateUserDto) {
  //     const { username, name } = createUserDto;

  //     return this.usersService.createUser(username, name);
  //   }

  //   @Get(':id')
  //   getUser(@Param('id') id: string) {
  //     return this.usersService.getUser(id);
  //   }

  //   @Delete(':id')
  //   deleteUser(@Param('id') id: string) {
  //     return this.usersService.deleteUser(id);
  //   }
}
