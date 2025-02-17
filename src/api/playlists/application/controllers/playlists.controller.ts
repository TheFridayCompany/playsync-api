import {
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { SYMBOLS } from 'src/common/symbols';
import IPlaylistsService from '../interfaces/playlists.service.interface';
import { PlaylistVisibility } from '../../domain/models/playlist.model';
import { User } from 'src/api/users/domain/models/user.model';

@Controller('playlists')
export class PlaylistsController {
  constructor(
    @Inject(SYMBOLS.PLAYLISTS_SERVICE)
    private readonly playlistsService: IPlaylistsService,
  ) {}

  @Post()
  create() {
    return this.playlistsService
      .forUser(new User('', '', ''))
      .createPlaylist('', '', [], PlaylistVisibility.PRIVATE);
  }

  @Patch()
  updateDetails(@Param('id') id: string) {
    return this.playlistsService
      .forUser(new User('', '', ''))
      .updatePlaylistDetails(id, '', '');
  }

  @Get(':id')
  getPlaylist(@Param('id') id: string) {
    return this.playlistsService.forUser(new User('', '', '')).getPlaylist(id);
  }

  @Get()
  getPlaylists(@Query('userId') id?: string) {
    return this.playlistsService.forUser(new User('', '', '')).getPlaylists(id);
  }

  @Delete(':id')
  deletePlaylist(@Param('id') id: string) {
    return this.playlistsService
      .forUser(new User('', '', ''))
      .deletePlaylist(id);
  }
}
