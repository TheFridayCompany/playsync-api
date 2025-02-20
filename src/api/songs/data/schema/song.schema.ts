import { Schema } from 'mongoose';

export const ArtistSchema = new Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  web_urls: { type: [String], default: [] },
  uris: { type: [String], default: [] },
});

export const SongSchema = new Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  duration_ms: { type: Number, required: true },
  web_urls: { type: [String], default: [] },
  uris: { type: [String], default: [] },
  artists: { type: [ArtistSchema], default: [] }, // Embedding Artists inside Song
});
