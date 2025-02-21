import { Song } from '../models/song.model';

export default interface IStreamingPlatformLinkBuilder {
  generate(song: Song): string;
}
