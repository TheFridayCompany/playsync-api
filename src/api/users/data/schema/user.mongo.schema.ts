import mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
});

export interface IUserModel {
  id: string;
  name: string;
  username: string;
}
