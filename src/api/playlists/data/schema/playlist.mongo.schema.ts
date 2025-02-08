import mongoose, { Schema } from 'mongoose';
import { PlaylistVisibility } from '../../domain/models/playlist.model';

export const PlaylistSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  visibility: {
    type: String,
    enum: Object.values(PlaylistVisibility),
    required: true,
  },
  ownerId: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  deletedAt: { type: Date, default: null },
  tracks: [{ type: Schema.Types.ObjectId, ref: 'Song' }], // TODO: Storing song references
  collaboratorIds: [{ type: String }], // Array of user IDs
});
