import mongoose, { Schema } from 'mongoose';
import { PlaylistVisibility } from '../../domain/models/playlist.model';
import { Song } from 'src/api/songs/domain/models/song.model';
import { SongSchema } from 'src/api/songs/data/schema/song.schema';

export const PlaylistSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: false },
  visibility: {
    type: String,
    enum: Object.values(PlaylistVisibility),
    required: true,
  },
  ownerId: { type: mongoose.Types.ObjectId, ref: 'Users', required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  songs: [{ type: SongSchema }],
  collaboratorIds: [{ type: Schema.Types.ObjectId, ref: 'Users' }], // Array of user IDs
});

export interface IPlaylist extends Document {
  _id: mongoose.Types.ObjectId;
  name: string;
  description?: string;
  visibility: PlaylistVisibility;
  ownerId: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
  songs: Song[]; // TODO: this should be an embedded song since songs are not being stored in database
  collaboratorIds: mongoose.Types.ObjectId[];
}
