/**
 * Represents the structure of the search response from the Spotify API.
 * Contains information about tracks returned in the search result.
 */
export default interface ISpotifySearchResponse {
  /**
   * The tracks returned in the search response.
   * Contains metadata and the list of tracks.
   */
  tracks: ISpotifyTracksResponse;
}

/**
 * Represents the structure of the tracks section in the Spotify API search response.
 * Contains metadata about the search results such as pagination details and the list of tracks.
 */
export interface ISpotifyTracksResponse {
  /**
   * URL to the full list of tracks for the current search response.
   */
  href: string;

  /**
   * Limit applied to the number of items returned in the search response.
   */
  limit: number;

  /**
   * URL to the next page of search results (if any).
   */
  next: string;

  /**
   * Offset applied in the search query (used for pagination).
   */
  offset: number;

  /**
   * Total number of tracks available in the search results.
   */
  total: number;

  /**
   * List of track items returned in the search response.
   */
  items: ISpotifyItemResponse[];
}

/**
 * Represents the structure of an individual track item in the Spotify search response.
 * Contains details about the track, such as its ID, name, and associated artists.
 */
export interface ISpotifyItemResponse {
  /**
   * Unique identifier for the track.
   */
  id: string;

  /**
   * Name of the track.
   */
  name: string;

  /**
   * URL to the track’s page on Spotify.
   */
  href: string;

  /**
   * URI used to identify the track on Spotify.
   */
  uri: string;

  /**
   * Duration of the track in milliseconds.
   */
  duration_ms: number;

  /**
   * List of artists associated with the track.
   */
  artists: ISpotifyItemArtistResponse[];

  /**
   * External URLs for the track, such as Spotify link.
   */
  external_urls: { spotify: string };
}

/**
 * Represents the structure of an individual artist in the track's artist list.
 * Contains details about the artist such as their name and external Spotify URL.
 */
export interface ISpotifyItemArtistResponse {
  /**
   * Unique identifier for the artist.
   */
  id: string;

  /**
   * Name of the artist.
   */
  name: string;

  /**
   * URL to the artist’s page on Spotify.
   */
  href: string;

  /**
   * External URLs for the artist, such as Spotify link.
   */
  external_urls: { spotify: string };

  /**
   * URI used to identify the artist on Spotify.
   */
  uri: string;
}
