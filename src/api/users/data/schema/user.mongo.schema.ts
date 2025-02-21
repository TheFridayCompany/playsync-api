import mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true, index: true },
  playlists: { type: [mongoose.Types.ObjectId], ref: 'Playlist' },
  collaboratingPlaylists: {
    type: [mongoose.Types.ObjectId],
    ref: 'Playlist',
  },
});

export interface IUserModel {
  id: string;
  name: string;
  username: string;
  playlists: mongoose.Types.ObjectId[];
  collaboratingPlaylists: mongoose.Types.ObjectId[];
}
