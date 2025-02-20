import { Artist } from './artist.model';

export class Song {
  id: string;
  name: string;
  duration_ms: number;
  web_urls: string[];
  uris: string[];
  artists: Artist[];

  constructor(
    id: string,
    name: string,
    duration_ms: number,
    web_urls: string[] = [],
    uris: string[] = [],
    artists: Artist[] = [],
  ) {
    this.id = id;
    this.name = name;
    this.duration_ms = duration_ms;
    this.web_urls = web_urls;
    this.uris = uris;
    this.artists = artists;
  }
}
