import { Controller, Inject } from '@nestjs/common';
import { SYMBOLS } from 'src/common/symbols';
import IPlaylistsService from '../interfaces/playlists.service.interface';

@Controller('playlists')
export class PlaylistsController {
  constructor(
    @Inject(SYMBOLS.PLAYLISTS_SERVICE)
    private readonly playlistsService: IPlaylistsService,
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
