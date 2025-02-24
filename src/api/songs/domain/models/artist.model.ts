import { PlatformLinksMap } from '../interfaces/platform-links-map.interface';
import { StreamingPlatforms } from './streaming-platforms.enum';

/**
 * Represents an artist in the system.
 * Contains information about the artist's ID, name, URI, and platform-specific URLs and URIs.
 */
export class Artist {
  /** The unique identifier of the artist */
  id: string;

  /** The name of the artist */
  name: string;

  /** A map of platform-specific web URLs for the artist */
  web_urls: PlatformLinksMap;

  /** A map of platform-specific URIs for the artist */
  uris: PlatformLinksMap;

  /**
   * Creates an instance of the Artist class.
   *
   * @param id The unique identifier of the artist.
   * @param name The name of the artist.
   * @param web_urls A map of platform-specific web URLs for the artist (optional).
   * @param uris A map of platform-specific URIs for the artist (optional).
   */
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
