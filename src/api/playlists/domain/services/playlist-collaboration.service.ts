import { Injectable } from '@nestjs/common';
import IPlaylistCollaborationService from '../../application/interfaces/playlist-collaboration.service.interface';

@Injectable()
export default class PlaylistCollaborationService
  implements IPlaylistCollaborationService
{
  addCollaborators(id: string, collaboratorIds: string[]): Promise<void> {
    /**
     * Should be able to add collaborator only if they are friends
     * Playlist should exist
     * Requesting user should be the owner of playlist
     * Added user should not already be a collaborator on the playlist
     * Playlist should not exceed maximum number of collaborators
     */
    throw new Error('Method not implemented.');
  }

  removeCollaborators(id: string, collaboratorIds: string[]): Promise<void> {
    /**
     * Playlist should exist
     * User should be a collaborator on the playlist
     * User should not be the owner of the playlist
     */
    throw new Error('Method not implemented.');
  }
}
