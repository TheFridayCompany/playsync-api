export class Song {
  id: string;
  name: string;
  spotify_uri: string;
  duration_ms: number;

  constructor(
    id: string,
    name: string,
    spotify_uri: string,
    duration_ms: number,
  ) {
    this.id = id;
    this.name = name;
    this.spotify_uri = spotify_uri;
    this.duration_ms = duration_ms;
  }
}
