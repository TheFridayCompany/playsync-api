import { Body, Controller, Delete, Inject, Param, Post } from '@nestjs/common';
import { SYMBOLS } from 'src/common/symbols';
import IPlaylistCollaborationService from '../interfaces/playlist-collaboration.service.interface';
import AddCollaboratorDto from '../dto/add-collaborator.dto';
import RemoveCollaboratorDto from '../dto/remove-collaborator.dto';

@Controller('playlists/:playlistId/collaborators')
export class PlaylistCollaborationController {
  constructor(
    @Inject(SYMBOLS.PLAYLIST_COLLABORATION_SERVICE)
    private readonly playlistCollaborationService: IPlaylistCollaborationService,
  ) {}

  @Post()
  addCollaborator(
    @Param('playlistId') playlistId: string,
    @Body() addCollaboratorDto: AddCollaboratorDto,
  ) {
    const { collaboratorId, userId } = addCollaboratorDto;

    return this.playlistCollaborationService.addCollaborator(
      playlistId,
      userId,
      collaboratorId,
    );
  }

  @Delete()
  removeCollaborator(
    @Param('playlistId') playlistId: string,
    @Body() removeCollaboratorDto: RemoveCollaboratorDto,
  ) {
    const { collaboratorId, userId } = removeCollaboratorDto;
    return this.playlistCollaborationService.removeCollaborator(
      playlistId,
      userId,
      collaboratorId,
    );
  }
}
