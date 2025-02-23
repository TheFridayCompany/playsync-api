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
  Req,
} from '@nestjs/common';
import { SYMBOLS } from 'src/common/symbols';
import IPlaylistsService from '../interfaces/playlists.service.interface';
import CreatePlaylistDto from '../dto/create-playlist.dto';
import UpdatePlaylistDto from '../dto/update-playlist.dto';
import { IUsersService } from 'src/api/users/application/interfaces/users.service.interface';
import { PlaylistVisibility } from '../../domain/models/playlist.model';
import { RequestWithEmail } from 'src/common/interfaces/request-with-user.interface';

@Controller('playlists')
export class PlaylistsController {
  constructor(
    @Inject(SYMBOLS.PLAYLISTS_SERVICE)
    private readonly playlistsService: IPlaylistsService,
    @Inject(SYMBOLS.USERS_SERVICE) private readonly usersService: IUsersService,
  ) {}

  @Post()
  async create(
    @Req() request: RequestWithEmail,
    @Body() data: CreatePlaylistDto,
  ) {
    const { email } = request.user;
    const user = await this.usersService.getUserByEmail(email);

    const { name, description, collaboratorIds, visibility } = data;

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
    @Req() request: RequestWithEmail,
    @Param('id') id: string,
    @Body() data: UpdatePlaylistDto,
  ) {
    const { name, description } = data;

    const { email } = request.user;
    const user = await this.usersService.getUserByEmail(email);

    return this.playlistsService
      .forUser(user)
      .updatePlaylistDetails(id, name, description);
  }

  @Get(':id')
  async getPlaylist(@Req() request: RequestWithEmail, @Param('id') id: string) {
    const { email } = request.user;
    const user = await this.usersService.getUserByEmail(email);

    return this.playlistsService.forUser(user).getPlaylist(id);
  }

  @Get()
  async getPlaylists(
    @Req() request: RequestWithEmail,
    @Query('userId') id?: string,
  ) {
    const { email } = request.user;
    const user = await this.usersService.getUserByEmail(email);

    return this.playlistsService.forUser(user).getPlaylists(id);
  }

  @Delete(':id')
  async deletePlaylist(
    @Req() request: RequestWithEmail,
    @Param('id') id: string,
  ) {
    const { email } = request.user;
    const user = await this.usersService.getUserByEmail(email);

    return this.playlistsService.forUser(user).deletePlaylist(id);
  }
}
