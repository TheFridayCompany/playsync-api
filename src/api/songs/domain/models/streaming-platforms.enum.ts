/**
 * Enum representing the supported music streaming platforms.
 * Each value corresponds to a unique identifier for a specific platform.
 *
 * @enum {string}
 * @readonly
 */
export enum StreamingPlatforms {
  /**
   * Apple Music streaming platform.
   * @constant {string} apple_music
   */
  AppleMusic = 'apple_music',

  /**
   * YouTube Music streaming platform.
   * @constant {string} youtube_music
   */
  YoutubeMusic = 'youtube_music',

  /**
   * Spotify streaming platform.
   * @constant {string} spotify
   */
  Spotify = 'spotify',
}
