import { ILinkGenerationStrategy } from 'src/api/songs/domain/interfaces/link-generation-strategy.interface';
import { Song } from 'src/api/songs/domain/models/song.model';
import { StreamingPlatforms } from 'src/api/songs/domain/models/streaming-platforms.enum';

export default class IdSpecificLinkStrategy implements ILinkGenerationStrategy {
  private platformToBaseUrlMap = {
    [StreamingPlatforms.Spotify]: 'https://open.spotify.com/track/',
  };

  generateLink(song: Song, streamingPlatform: StreamingPlatforms): string {
    const baseUrl = this.platformToBaseUrlMap[streamingPlatform];

    if (!baseUrl) {
      throw new Error('Cannot find base url for this platform');
    }

    return baseUrl + song.id;
  }
}
