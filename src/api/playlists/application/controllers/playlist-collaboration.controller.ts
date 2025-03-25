import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Req,
} from '@nestjs/common';
import { SYMBOLS } from 'src/common/symbols';
import IPlaylistCollaborationService from '../interfaces/playlist-collaboration.service.interface';
import AddCollaboratorDto from '../dto/add-collaborator.dto';
import RemoveCollaboratorDto from '../dto/remove-collaborator.dto';
import { RequestWithEmail } from 'src/common/interfaces/request-with-user.interface';
import { IUsersService } from 'src/api/users/application/interfaces/users.service.interface';

@Controller('playlists/:playlistId/collaborators')
export class PlaylistCollaborationController {
  constructor(
    @Inject(SYMBOLS.PLAYLIST_COLLABORATION_SERVICE)
    private readonly playlistCollaborationService: IPlaylistCollaborationService,
    @Inject(SYMBOLS.USERS_SERVICE) private readonly usersService: IUsersService,
  ) {}

  @Get()
  async getCollaborators(
    @Req() request: RequestWithEmail,
    @Param('playlistId') playlistId: string,
  ) {
    const { email } = request.user;

    const user = await this.usersService.getUserByEmail(email);

    return this.playlistCollaborationService.getCollaborators(
      playlistId,
      user.id,
    );
  }

  @Post()
  async addCollaborator(
    @Req() request: RequestWithEmail,
    @Param('playlistId') playlistId: string,
    @Body() addCollaboratorDto: AddCollaboratorDto,
  ) {
    const { collaboratorId } = addCollaboratorDto;
    const { email } = request.user;

    const user = await this.usersService.getUserByEmail(email);

    return this.playlistCollaborationService.addCollaborator(
      playlistId,
      user.id,
      collaboratorId,
    );
  }

  @Delete()
  async removeCollaborator(
    @Req() request: RequestWithEmail,
    @Param('playlistId') playlistId: string,
    @Body() removeCollaboratorDto: RemoveCollaboratorDto,
  ) {
    const { collaboratorId } = removeCollaboratorDto;
    const { email } = request.user;

    const user = await this.usersService.getUserByEmail(email);

    return this.playlistCollaborationService.removeCollaborator(
      playlistId,
      user.id,
      collaboratorId,
    );
  }
}
