import { Injectable } from '@nestjs/common';
import IPlaylistCollaborationService from '../../application/interfaces/playlist-collaboration.service.interface';

@Injectable()
export default class PlaylistCollaborationService
  implements IPlaylistCollaborationService
{
  addCollaborators(id: string, collaboratorIds: string[]): Promise<void> {
    throw new Error('Method not implemented.');
  }

  requestCollaboration(id: string, collaboratorId: string): Promise<void> {
    throw new Error('Method not implemented.');
  }

  removeCollaborators(id: string, collaboratorIds: string[]): Promise<void> {
    throw new Error('Method not implemented.');
  }

  acceptCollaborator(id: string, collaboratorId: string): Promise<void> {
    throw new Error('Method not implemented.');
  }

  rejectCollaborator(id: string, collaboratorId: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
