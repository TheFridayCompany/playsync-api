import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import IPlaylistsService from '../../application/interfaces/playlists.service.interface';
import { PlaylistVisibility, Playlist } from '../models/playlist.model';
import { SYMBOLS } from 'src/common/symbols';
import IPlaylistRepository from '../interfaces/playlist.repository.interface';
import { User } from 'src/api/users/domain/models/user.model';
import { PlaylistNotFoundError } from 'src/common/errors/playlist-not-found.error';
import IFriendshipService from 'src/api/friends/application/interfaces/friendship.service.interface';
import IPlaylistCollaborationService from '../../application/interfaces/playlist-collaboration.service.interface';

@Injectable()
export default class PlaylistsService implements IPlaylistsService {
  private user: User;

  constructor(
    @Inject(SYMBOLS.PLAYLISTS_REPOSITORY)
    private readonly playlistsRepository: IPlaylistRepository,
    @Inject(SYMBOLS.FRIENDSHIP_SERVICE)
    private readonly friendshipService: IFriendshipService,
    @Inject(SYMBOLS.PLAYLIST_COLLABORATION_SERVICE)
    private readonly playlistCollaborationService: IPlaylistCollaborationService,
  ) {}

  forUser(user: User): PlaylistsService {
    this.user = user;
    return this;
  }

  async createPlaylist(
    name: string,
    description: string,
    collaboratorIds: string[],
    visibility: PlaylistVisibility,
  ): Promise<Playlist> {
    // TODO: perform sanitation on playlist name and description

    const playlist = await this.playlistsRepository.create(
      name,
      description,
      visibility,
      this.user.id,
    );

    // check if collaborators exist and are friends of the user
    const filteredCollaboratorIds = await Promise.all(
      collaboratorIds.map(async (collaboratorId) => {
        const areFriends = await this.friendshipService.checkFriendshipStatus(
          this.user.id,
          collaboratorId,
        );
        return areFriends ? collaboratorId : null;
      }),
    );

    // Remove `null` values
    const finalCollaboratorIds = filteredCollaboratorIds.filter(Boolean);

    // embed playlist id into collaborator's playlists field
    if (finalCollaboratorIds.length > 0) {
      await Promise.all(
        collaboratorIds.map((collaboratorId) =>
          this.playlistCollaborationService.addCollaborator(
            playlist.id,
            this.user.id,
            collaboratorId,
          ),
        ),
      );
    }

    return playlist;
  }

  async updatePlaylistDetails(
    id: string,
    name: string,
    description: string,
  ): Promise<Playlist> {
    // check if playlist actually exists; if not throw PlaylistNotFoundError
    const playlist = await this.playlistsRepository.findOneById(id);

    console.log(JSON.stringify(playlist));

    if (!playlist) {
      throw new PlaylistNotFoundError(id);
    }

    // check if the user is the creator of the playlist; if not throw unauthorized exception
    if (playlist.userId !== this.user.id) {
      throw new UnauthorizedException(
        "You need to be the creator of the playlist to modify this it's visibility",
      );
    }

    // TODO: perform sanitation on name and description

    // pass the name and description to repository
    return this.playlistsRepository.update(
      id,
      name,
      description,
      playlist.visibility,
    );
  }

  async updatePlaylistVisibility(
    id: string,
    visibility: PlaylistVisibility,
  ): Promise<Playlist> {
    // check if playlist exists; if not throw PlaylistNotFoundError
    const playlist = await this.playlistsRepository.findOneById(id);

    if (!playlist) {
      throw new PlaylistNotFoundError(id);
    }

    // check if user is the creator of the playlist; if not throw UnauthorizedException
    if (playlist.userId !== this.user.id) {
      throw new UnauthorizedException(
        "You need to be the creator of the playlist to modify this it's visibility",
      );
    }

    // if the visibility is the same; return early
    if (playlist.visibility == visibility) {
      return playlist;
    }

    // pass the visibility to repository to update
    return this.playlistsRepository.update(
      id,
      playlist.name,
      playlist.description,
      visibility,
    );
  }

  async deletePlaylist(id: string): Promise<void> {
    // check if playlist exists; if not throw PlaylistNotFoundError
    const playlist = await this.playlistsRepository.findOneById(id);

    if (!playlist) {
      throw new PlaylistNotFoundError(id);
    }

    console.log(JSON.stringify(playlist));
    console.log(this.user.id);

    //check if the user is the creator of the playlist; if not throw unauthorized exception
    if (playlist.userId !== this.user.id) {
      throw new UnauthorizedException(
        "You need to be the creator of the playlist to modify this it's visibility",
      );
    }

    // delete playlist
    await this.playlistsRepository.delete(id);
  }

  async getPlaylist(id: string): Promise<Playlist> {
    // check if playlist exists; if not throw PlaylistNotFoundError
    const playlist = await this.playlistsRepository.findOneById(id);

    if (!playlist) {
      throw new PlaylistNotFoundError(id);
    }

    // if playlist is private and the requesting user is not the creator or not a collaborator; throw UnauthorizedException
    if (
      playlist.visibility == PlaylistVisibility.PRIVATE &&
      (playlist.userId !== this.user.id ||
        !playlist.collaboratorIds.includes(this.user.id))
    ) {
      throw new UnauthorizedException(
        'You do not have access to this playlist',
      );
    }

    return playlist;
  }

  async getPlaylists(userId?: string): Promise<Playlist[]> {
    // requesting for my playlists; find all playlists for the user set in global scope i.e. private and publicly created playlists and playlists where user is a collaborator
    if (!userId || (userId && userId === this.user.id)) {
      return this.playlistsRepository.findForUser(this.user.id, true);
    }

    // check if this user is friends with globally set user; if not then throw unauthorized exception
    const areFriends = await this.friendshipService.checkFriendshipStatus(
      userId,
      this.user.id,
    );

    if (!areFriends) {
      throw new UnauthorizedException(
        'You need to be friends with user to view their playlists',
      );
    }

    // return all publicly created playlists of the user.
    return this.playlistsRepository.findForUser(userId, false, [
      PlaylistVisibility.PUBLIC,
    ]);
  }
}
