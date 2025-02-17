export default interface ISpotifySearchResponse {
  tracks: ISpotifyTracksResponse;
}

export interface ISpotifyTracksResponse {
  href: string;
  limit: number;
  next: string;
  offset: number;
  total: number;
  items: ISpotifyItemResponse[];
}

export interface ISpotifyItemResponse {
  id: string;
  name: string;
  spotify_uri: string;
  duration_ms: number;
}
