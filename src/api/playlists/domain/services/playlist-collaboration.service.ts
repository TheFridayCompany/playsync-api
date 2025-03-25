import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import IPlaylistCollaborationService from '../../application/interfaces/playlist-collaboration.service.interface';
import { SYMBOLS } from 'src/common/symbols';
import IPlaylistRepository from '../interfaces/playlist.repository.interface';
import IFriendshipService from 'src/api/friends/application/interfaces/friendship.service.interface';
import { PlaylistNotFoundError } from 'src/common/errors/playlist-not-found.error';
import { ConfigService } from '@nestjs/config';
import { ReachedMaximumCollaboratorsLimitForPlaylistError } from 'src/common/errors/maximum-collaborators-for-playlist.error';
import { CannotAddNonFriendAsCollaboratorError } from 'src/common/errors/cannot-add-non-friend-as-collaborator.error';
import { CannotAddOwnerAsCollaboratorError } from 'src/common/errors/cannot-add-owner-as-collaborator.error';
import { CollaboratorNotFoundError } from 'src/common/errors/no-such-collaborator-found.error';
import { CollaboratorAlreadyExistsError } from 'src/common/errors/collaborator-already-exists.error';
import { User } from 'src/api/users/domain/models/user.model';
import { IUsersService } from 'src/api/users/application/interfaces/users.service.interface';

@Injectable()
export default class PlaylistCollaborationService
  implements IPlaylistCollaborationService
{
  private readonly MAX_PLAYLIST_COLLABORATORS: number;

  constructor(
    @Inject(SYMBOLS.PLAYLISTS_REPOSITORY)
    private readonly playlistsRepository: IPlaylistRepository,
    @Inject(SYMBOLS.FRIENDSHIP_SERVICE)
    private readonly friendshipService: IFriendshipService,
    @Inject(SYMBOLS.USERS_SERVICE)
    private readonly usersService: IUsersService,
    private readonly configService: ConfigService,
  ) {
    this.MAX_PLAYLIST_COLLABORATORS = this.configService.get<number>(
      'MAX_PLAYLIST_COLLABORATORS',
    );
  }

  async getCollaborators(id: string, ownerId: string): Promise<User[]> {
    const playlist = await this.playlistsRepository.findOneById(id);

    if (!playlist) {
      throw new PlaylistNotFoundError(id);
    }

    if (playlist.userId !== ownerId) {
      throw new UnauthorizedException(
        'You do not have permission to view collaborators of playlist',
      );
    }

    return this.usersService.getUsers(playlist.collaboratorIds);
  }

  async addCollaborator(
    id: string,
    ownerId: string,
    collaboratorId: string,
  ): Promise<void> {
    // check if playlist exists; if not throw error
    const playlist = await this.playlistsRepository.findOneById(id);

    if (!playlist) {
      throw new PlaylistNotFoundError(id);
    }

    // if owner is tried to add as a collaborator
    if (playlist.userId === collaboratorId) {
      throw new CannotAddOwnerAsCollaboratorError(
        'Cannot add owner of playlist as collaborator',
      );
    }

    // throw error if requesting user is not the owner of playlist
    if (playlist.userId !== ownerId) {
      throw new UnauthorizedException(
        'You do not have permission to add collaborators to playlist',
      );
    }

    // throw error if collaborator already added to playlist
    if (playlist.collaboratorIds.includes(collaboratorId)) {
      throw new CollaboratorAlreadyExistsError(collaboratorId);
    }

    // if already reached maximum number of collaborators for playlist
    if (playlist.collaboratorIds.length >= this.MAX_PLAYLIST_COLLABORATORS) {
      throw new ReachedMaximumCollaboratorsLimitForPlaylistError(id);
    }

    // check if they are friends; if not then throw error
    const areFriends = await this.friendshipService.checkFriendshipStatus(
      ownerId,
      collaboratorId,
    );

    if (!areFriends) {
      throw new CannotAddNonFriendAsCollaboratorError();
    }

    // add collaborator
    await this.playlistsRepository.addCollaborator(id, collaboratorId);
  }

  async removeCollaborator(
    id: string,
    ownerId: string,
    collaboratorId: string,
  ): Promise<void> {
    // check if playlist exists; if not throw error
    const playlist = await this.playlistsRepository.findOneById(id);

    if (!playlist) {
      throw new PlaylistNotFoundError(id);
    }

    if (ownerId === collaboratorId || playlist.userId === collaboratorId) {
      throw new Error('Cannot remove owner of playlist as collaborator');
    }

    // throw error if user is already not a collaborator to playlist
    if (!playlist.collaboratorIds.includes(collaboratorId)) {
      throw new CollaboratorNotFoundError(collaboratorId);
    }

    await this.playlistsRepository.removeCollaborator(id, collaboratorId);
  }
}
