import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import IPlaylistsService from '../../application/interfaces/playlists.service.interface';
import { PlaylistVisibility, Playlist } from '../models/playlist.model';
import { SYMBOLS } from 'src/common/symbols';
import IPlaylistRepository from '../interfaces/playlist.repository.interface';
import { User } from 'src/api/users/domain/models/user.model';
import { PlaylistNotFoundError } from 'src/common/errors/playlist-not-found.error';
import IFriendshipService from 'src/api/friends/application/interfaces/friendship.service.interface';

@Injectable()
export default class PlaylistsService implements IPlaylistsService {
  private user: User;

  constructor(
    @Inject(SYMBOLS.PLAYLISTS_REPOSITORY)
    private readonly playlistsRepository: IPlaylistRepository,
    @Inject(SYMBOLS.FRIENDSHIP_SERVICE)
    private readonly friendshipService: IFriendshipService,
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

    // TODO: check if collaborators exist and are friends of the user

    const playlist = await this.playlistsRepository.create();

    // TODO: embed playlist id into creator's playlists field and collaborator's playlists field

    return playlist;
  }

  async updatePlaylistDetails(
    id: string,
    name: string,
    description: string,
  ): Promise<Playlist> {
    // TODO: check if playlist actually exists; if not throw PlaylistNotFoundError
    const playlist = await this.playlistsRepository.findOneById(id);

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

    // TODO: pass the name and description to repository
    return this.playlistsRepository.update(id);
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

    // TODO: pass the visibility to repository to update
    return this.playlistsRepository.update(id);
  }

  async deletePlaylist(id: string): Promise<void> {
    // check if playlist exists; if not throw PlaylistNotFoundError
    const playlist = await this.playlistsRepository.findOneById(id);

    if (!playlist) {
      throw new PlaylistNotFoundError(id);
    }

    //check if the user is the creator of the playlist; if not throw unauthorized exception
    if (playlist.userId !== this.user.id) {
      throw new UnauthorizedException(
        "You need to be the creator of the playlist to modify this it's visibility",
      );
    }
    // TODO: think about what happens to the collaborators of the playlist??

    // delete playlist
    await this.playlistsRepository.delete(id);

    // TODO: delete embedded ids from user (creator and collaborator) objects
  }

  async getPlaylist(id: string): Promise<Playlist> {
    // check if playlist exists; if not throw PlaylistNotFoundError
    const playlist = await this.playlistsRepository.findOneById(id);

    if (!playlist) {
      throw new PlaylistNotFoundError(id);
    }

    // if playlist is private and the requesting user is not the creator; throw UnauthorizedException
    if (
      playlist.visibility == PlaylistVisibility.PRIVATE &&
      playlist.userId !== this.user.id
    ) {
      throw new UnauthorizedException(
        'You do not have access to this playlist',
      );
    }

    return playlist;
  }

  async getPlaylists(userId?: string): Promise<Playlist[]> {
    /**
     * if user id is null or not null and equal to the id of the user in global scope; find all playlists for the user set in global scope i.e. private and publicly created playlists and public playlists where user is a collaborator
     * if user id is not null and not equal to the id of the user in global scope;
     *    check if the globally set user is friends with this user id;
     *      if they are not friends throw unauthorized exception;
     *      else find all publicly created playlists of the user. should we show collaborating playlists??
     */

    // requesting for my playlists; find all playlists for the user set in global scope i.e. private and publicly created playlists and public playlists where user is a collaborator
    if (!userId || (userId && userId === this.user.id)) {
    }

    // TODO: check if this user is friends with globally set user
    const areFriends = await this.friendshipService.checkFriendshipStatus(
      userId,
      this.user.id,
    );

    if (!areFriends) {
      throw new UnauthorizedException(
        'You need to be friends with user to view their playlists',
      );
    }

    // TODO: return all publicly created playlists of the user.

    throw new Error('Method not implemented.');
  }
}
