import { Injectable } from '@nestjs/common';
import IPlaylistRepository from '../../domain/interfaces/playlist.repository.interface';
import {
  Playlist,
  PlaylistVisibility,
} from '../../domain/models/playlist.model';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { IPlaylist } from '../schema/playlist.mongo.schema';
import { convertMongooseObjectIdToString } from 'src/common/utils';
import { User } from 'src/api/users/domain/models/user.model';
import { IUserModel } from 'src/api/users/data/schema/user.mongo.schema';
import { Song } from 'src/api/songs/domain/models/song.model';

@Injectable()
export default class PlaylistMongoRepository implements IPlaylistRepository {
  constructor(
    @InjectModel(Playlist.name)
    private readonly playlistModel: mongoose.Model<IPlaylist>,
    @InjectModel(User.name)
    private readonly userModel: mongoose.Model<IUserModel>,
  ) {}

  async addSong(id: string, song: Song): Promise<Playlist> {
    const playlist = await this.playlistModel.findByIdAndUpdate(id, {
      $push: { songs: song },
    });
    return this.toDomain(playlist);
  }

  async create(
    name: string,
    description: string,
    visibility: PlaylistVisibility,
    userId: string,
  ): Promise<Playlist> {
    const session = await this.playlistModel.db.startSession();
    session.startTransaction();

    try {
      const newPlaylist = await this.playlistModel.create(
        [
          {
            name,
            description,
            visibility,
            ownerId: userId,
          },
        ],
        { session },
      );

      console.log(JSON.stringify(newPlaylist));

      // is this a good appoach? should we inject user service here instead?
      await this.userModel.updateOne(
        { _id: userId },
        { $push: { playlists: newPlaylist[0]._id } },
      );

      await session.commitTransaction();
      session.endSession();

      return this.toDomain(newPlaylist[0]);
    } catch (e) {
      await session.abortTransaction();
      session.endSession();
      throw e;
    }
  }

  async findOneById(id: string): Promise<Playlist | null> {
    const response = await this.playlistModel.findById(id);
    return this.toDomain(response);
  }

  async findForUser(
    userId: string,
    includeCollaborations = false, // Whether to include collaborating playlists
    visibility?: PlaylistVisibility[], // Filter for public/private created playlists
    collaborationVisibility?: PlaylistVisibility[], // Filter for public/private collaborating playlists
  ): Promise<Playlist[]> {
    // Fetch user document to get playlist IDs
    const user = await this.userModel
      .findById(userId)
      .select('playlists collaboratingPlaylists');

    if (!user) throw new Error('User not found');

    const query: any = { _id: { $in: user.playlists } };

    // Apply visibility filter if needed for created playlists
    if (visibility && visibility.length > 0) {
      query.visibility = { $in: visibility };
    }

    // Fetch created playlists
    const createdPlaylists = await this.playlistModel.find(query);

    let collaboratingPlaylists: IPlaylist[] = [];
    if (includeCollaborations) {
      // If collaborationVisibility is provided, filter collaborations by visibility
      const collaborationQuery: any = {
        _id: { $in: user.collaboratingPlaylists },
      };

      if (collaborationVisibility && collaborationVisibility.length > 0) {
        collaborationQuery.visibility = { $in: collaborationVisibility };
      }

      // Fetch collaborating playlists based on visibility filter
      collaboratingPlaylists =
        await this.playlistModel.find(collaborationQuery);
    }

    // Combine both created and collaborating playlists
    return [...createdPlaylists, ...collaboratingPlaylists].map((p) =>
      this.toDomain(p),
    );
  }

  async update(
    id: string,
    name: string,
    description: string,
    visibility: PlaylistVisibility,
  ): Promise<Playlist> {
    const response = await this.playlistModel.findByIdAndUpdate(
      id,
      {
        name,
        description,
        visibility,
      },
      { new: true },
    );

    return this.toDomain(response);
  }

  async delete(id: string): Promise<Playlist> {
    const session = await this.playlistModel.db.startSession();
    session.startTransaction();

    try {
      const playlistToDelete = await this.playlistModel.findById(id);

      // remove the playlist from the owner's playlists field
      await this.userModel.updateOne(
        { _id: playlistToDelete.ownerId },
        {
          $pull: { playlists: playlistToDelete._id },
        },
        session,
      );

      // remove the playlist id from all collaborating users
      if (playlistToDelete.collaboratorIds.length > 0) {
        await this.userModel.updateMany(
          {
            _id: { $in: playlistToDelete.collaboratorIds },
          },
          {
            $pull: { collaboratingPlaylists: playlistToDelete._id },
          },
          session,
        );
      }

      // delete the playlist
      await this.playlistModel.findByIdAndDelete(playlistToDelete.id, session);

      await session.commitTransaction();
      session.endSession();

      return this.toDomain(playlistToDelete);
    } catch (e) {
      await session.abortTransaction();
      session.endSession();
      throw e;
    }
  }

  private toDomain(playlistModel: IPlaylist): Playlist {
    const {
      _id,
      name,
      description,
      visibility,
      ownerId,
      createdAt,
      updatedAt,
      collaboratorIds,
      songs,
    } = playlistModel;

    return new Playlist(
      convertMongooseObjectIdToString(_id),
      name,
      description,
      visibility,
      convertMongooseObjectIdToString(ownerId),
      createdAt,
      updatedAt,
      collaboratorIds.map((id) => convertMongooseObjectIdToString(id)),
      songs.map(
        (song) =>
          new Song(
            song.id,
            song.name,
            song.duration_ms,
            song.web_urls,
            song.uris,
            song.artists,
          ),
      ),
    );
  }
}
