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
  href: string;
  uri: string;
  duration_ms: number;
  artists: ISpotifyItemArtistResponse[];
  external_urls: { spotify: string };
}

export interface ISpotifyItemArtistResponse {
  id: string;
  name: string;
  href: string;
  external_urls: { spotify: string };
  uri: string;
}
