import { Controller, Inject } from '@nestjs/common';
import { SYMBOLS } from 'src/common/symbols';
import IPlaylistCollaborationService from '../interfaces/playlist-collaboration.service.interface';

@Controller('playlists/collaboration')
export class PlaylistCollaborationController {
  constructor(
    @Inject(SYMBOLS.PLAYLIST_COLLABORATION_SERVICE)
    private readonly playlistCollaborationService: IPlaylistCollaborationService,
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
