import {
  Body,
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
import CreatePlaylistDto from '../dto/create-playlist.dto';
import UpdatePlaylistDto from '../dto/update-playlist.dto';
import { IUsersService } from 'src/api/users/application/interfaces/users.service.interface';
import { PlaylistVisibility } from '../../domain/models/playlist.model';

@Controller('playlists')
export class PlaylistsController {
  private readonly userId: string = '67aab02f833f69d4e6bf7d23'; // id for rohanddave username

  constructor(
    @Inject(SYMBOLS.PLAYLISTS_SERVICE)
    private readonly playlistsService: IPlaylistsService,
    @Inject(SYMBOLS.USERS_SERVICE) private readonly usersService: IUsersService,
  ) {}

  @Post()
  async create(@Body() data: CreatePlaylistDto) {
    const { name, description, collaboratorIds, visibility } = data;

    const user = await this.usersService.getUser(this.userId);

    return this.playlistsService
      .forUser(user)
      .createPlaylist(
        name,
        description,
        collaboratorIds ?? [],
        visibility ?? PlaylistVisibility.PUBLIC,
      );
  }

  @Patch(':id')
  async updateDetails(
    @Param('id') id: string,
    @Body() data: UpdatePlaylistDto,
  ) {
    const { name, description } = data;

    const user = await this.usersService.getUser(this.userId);

    return this.playlistsService
      .forUser(user)
      .updatePlaylistDetails(id, name, description);
  }

  @Get(':id')
  async getPlaylist(@Param('id') id: string) {
    const user = await this.usersService.getUser(this.userId);

    return this.playlistsService.forUser(user).getPlaylist(id);
  }

  @Get()
  async getPlaylists(@Query('userId') id?: string) {
    const user = await this.usersService.getUser(this.userId);

    return this.playlistsService.forUser(user).getPlaylists(id);
  }

  @Delete(':id')
  async deletePlaylist(@Param('id') id: string) {
    const user = await this.usersService.getUser(this.userId);

    return this.playlistsService.forUser(user).deletePlaylist(id);
  }
}
