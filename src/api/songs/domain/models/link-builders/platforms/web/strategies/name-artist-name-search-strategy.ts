import { ILinkGenerationStrategy } from 'src/api/songs/domain/interfaces/link-generation-strategy.interface';
import { Song } from 'src/api/songs/domain/models/song.model';
import { StreamingPlatforms } from 'src/api/songs/domain/models/streaming-platforms.enum';

export default class SongNameAndArtistsNamesSearchStrategy
  implements ILinkGenerationStrategy
{
  private platformToBaseUrlMap = {
    [StreamingPlatforms.AppleMusic]: 'https://music.apple.com/us/search?term=',
    [StreamingPlatforms.YoutubeMusic]: 'https://music.youtube.com/search?q=',
    [StreamingPlatforms.Spotify]: 'https://music.apple.com/us/search?term=', // TODO: change this
  };

  generateLink(song: Song, streamingPlatform: StreamingPlatforms): string {
    const { name, artists } = song;

    return (
      this.platformToBaseUrlMap[streamingPlatform] +
      `${name}+${artists.map((artist) => artist.name)}`.replaceAll(' ', '+')
    );
  }
}
