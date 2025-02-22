import { PlatformLinksMap } from '../interfaces/platform-links-map.interface';
import { StreamingPlatforms } from './streaming-platforms.enum';

export class Artist {
  id: string;
  name: string;
  uri: string;
  web_urls: PlatformLinksMap;
  uris: PlatformLinksMap;

  constructor(
    id: string,
    name: string,
    web_urls: PlatformLinksMap = {
      [StreamingPlatforms.Spotify]: '',
      [StreamingPlatforms.AppleMusic]: '',
      [StreamingPlatforms.YoutubeMusic]: '',
    },
    uris: PlatformLinksMap = {
      [StreamingPlatforms.Spotify]: '',
      [StreamingPlatforms.AppleMusic]: '',
      [StreamingPlatforms.YoutubeMusic]: '',
    },
  ) {
    this.id = id;
    this.name = name;
    this.web_urls = web_urls;
    this.uris = uris;
  }
}
