import { ILinkGenerationStrategy } from '../interfaces/link-generation-strategy.interface';
import { PlatformLinksMap } from '../interfaces/platform-links-map.interface';
import { Artist } from './artist.model';
import AppleMusicMobileLinkGenerator from './link-builders/platforms/mobile/apple-music-mobile-link.generator';
import AppleMusicWebLinkGenerator from './link-builders/platforms/web/apple-music-web-link.generator';
import SpotifyWebLinkGenerator from './link-builders/platforms/web/spotify-web-link.generator';
import IdSpecificLinkStrategy from './link-builders/platforms/web/strategies/id-specific-link.strategy';
import SongNameAndArtistsNamesSearchStrategy from './link-builders/platforms/web/strategies/name-artist-name-search-strategy';
import YoutubeMusicWebLinkGenerator from './link-builders/platforms/web/youtube-music-web-link.generator';
import AbstractStreamingPlatformLinkGenerator from './link-builders/streaming-platform-link-generator';
import { StreamingPlatforms } from './streaming-platforms.enum';

/**
 * Class representing a Song with links to various streaming platforms.
 */
export class Song {
  /**
   * A map of web URLs for the song, keyed by streaming platforms.
   * @type {PlatformLinksMap}
   */
  public readonly web_urls: PlatformLinksMap;

  /**
   * A map of URIs for the song, keyed by streaming platforms.
   * @type {PlatformLinksMap}
   */
  public readonly uris: PlatformLinksMap;

  /**
   * Constructs a Song object, generating platform-specific web URLs and URIs.
   *
   * @param {string} id - The unique identifier for the song.
   * @param {string} name - The name of the song.
   * @param {number} duration_ms - The duration of the song in milliseconds.
   * @param {Artist[]} [artists=[]] - An array of artists who performed the song.
   * @param {Object} webUrlGenerators - A map of link generators for generating web URLs.
   * @param {Object} uriGenerators - A map of link generators for generating URIs.
   */
  private constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly duration_ms: number,
    public readonly artists: Artist[] = [],
    webUrlGenerators: {
      [platform in StreamingPlatforms]: AbstractStreamingPlatformLinkGenerator;
    },
    uriGenerators: {
      [platform in StreamingPlatforms]: AbstractStreamingPlatformLinkGenerator;
    },
  ) {
    this.web_urls = this.generateLinks(webUrlGenerators);
    this.uris = this.generateLinks(uriGenerators);
  }

  /**
   * Helper method to generate links for each platform using the provided generators.
   *
   * @param {Object} generators - A map of platform-specific link generators.
   * @returns {PlatformLinksMap} A map of generated links for each platform.
   */
  private generateLinks(generators: {
    [platform in StreamingPlatforms]: AbstractStreamingPlatformLinkGenerator;
  }): PlatformLinksMap {
    const links: PlatformLinksMap = {
      [StreamingPlatforms.Spotify]: '',
      [StreamingPlatforms.AppleMusic]: '',
      [StreamingPlatforms.YoutubeMusic]: '',
    };

    for (const platform in generators) {
      const generator = generators[platform as StreamingPlatforms];
      links[platform as StreamingPlatforms] = generator.generate(this);
    }

    return links;
  }

  /**
   * Static builder class for constructing Song objects with flexible configuration.
   */
  static Builder = class {
    /** @type {string} The song's unique identifier. */
    public id: string;

    /** @type {string} The name of the song. */
    public name: string;

    /** @type {number} The song's duration in milliseconds. */
    public duration_ms: number;

    /**
     * @type {Artist[]} An array of artists who performed the song.
     */
    public artists: Artist[];

    /**
     * @type {Object} A map of link generators for generating web URLs.
     * @private
     */
    public webUrlGenerators: {
      [platform in StreamingPlatforms]: AbstractStreamingPlatformLinkGenerator;
    } = {
      [StreamingPlatforms.Spotify]: new SpotifyWebLinkGenerator(
        new IdSpecificLinkStrategy(),
      ),
      [StreamingPlatforms.AppleMusic]: new AppleMusicWebLinkGenerator(
        new SongNameAndArtistsNamesSearchStrategy(),
      ),
      [StreamingPlatforms.YoutubeMusic]: new YoutubeMusicWebLinkGenerator(
        new SongNameAndArtistsNamesSearchStrategy(),
      ),
    };

    /**
     * @type {Object} A map of link generators for generating URIs.
     * @private
     */
    public uriGenerators: {
      [platform in StreamingPlatforms]: AbstractStreamingPlatformLinkGenerator;
    } = {
      [StreamingPlatforms.Spotify]: new SpotifyWebLinkGenerator(
        new SongNameAndArtistsNamesSearchStrategy(),
      ),
      [StreamingPlatforms.AppleMusic]: new AppleMusicMobileLinkGenerator(
        new SongNameAndArtistsNamesSearchStrategy(),
      ),
      [StreamingPlatforms.YoutubeMusic]: new AppleMusicMobileLinkGenerator(
        new SongNameAndArtistsNamesSearchStrategy(),
      ),
    };

    /**
     * Initializes a new instance of the Builder with required fields.
     *
     * @param {string} id - The unique identifier for the song.
     * @param {string} name - The name of the song.
     * @param {number} duration_ms - The duration of the song in milliseconds.
     * @param {Artist[]} artists - An array of artists who performed the song.
     */
    constructor(
      id: string,
      name: string,
      duration_ms: number,
      artists: Artist[],
    ) {
      this.id = id;
      this.name = name;
      this.duration_ms = duration_ms;
      this.artists = artists;
    }

    /**
     * Sets a custom link generator for a specific platform's web URL.
     *
     * @param {StreamingPlatforms} platform - The platform to set the generator for.
     * @param {AbstractStreamingPlatformLinkGenerator} generator - The link generator to use.
     * @returns {this} The builder instance for chaining.
     */
    setWebUrlGenerator(
      platform: StreamingPlatforms,
      generator: AbstractStreamingPlatformLinkGenerator,
    ): this {
      this.webUrlGenerators[platform] = generator;
      return this;
    }

    /**
     * Sets a custom link generator for a specific platform's URI.
     *
     * @param {StreamingPlatforms} platform - The platform to set the generator for.
     * @param {AbstractStreamingPlatformLinkGenerator} generator - The link generator to use.
     * @returns {this} The builder instance for chaining.
     */
    setUriGenerator(
      platform: StreamingPlatforms,
      generator: AbstractStreamingPlatformLinkGenerator,
    ): this {
      this.uriGenerators[platform] = generator;
      return this;
    }

    /**
     * Sets custom web URL generators for all platforms.
     *
     * @param {Object} generators - A map of platform-specific web URL generators.
     * @returns {this} The builder instance for chaining.
     */
    setWebUrlGenerators(generators: {
      [platform in StreamingPlatforms]: AbstractStreamingPlatformLinkGenerator;
    }): this {
      this.webUrlGenerators = generators;
      return this;
    }

    /**
     * Sets custom URI generators for all platforms.
     *
     * @param {Object} generators - A map of platform-specific URI generators.
     * @returns {this} The builder instance for chaining.
     */
    setUriGenerators(generators: {
      [platform in StreamingPlatforms]: AbstractStreamingPlatformLinkGenerator;
    }): this {
      this.uriGenerators = generators;
      return this;
    }

    /**
     * Sets the link generation strategy for a specific platform's web URL.
     *
     * @param {StreamingPlatforms} platform - The platform to set the strategy for.
     * @param {ILinkGenerationStrategy} strategy - The strategy to apply.
     * @returns {this} The builder instance for chaining.
     */
    setWebUrlLinkGenerationStrategy(
      platform: StreamingPlatforms,
      strategy: ILinkGenerationStrategy,
    ): this {
      const generator = this.webUrlGenerators[platform];
      generator.setLinkGenerationStrategy(strategy);
      return this;
    }

    /**
     * Sets the link generation strategy for a specific platform's URI.
     *
     * @param {StreamingPlatforms} platform - The platform to set the strategy for.
     * @param {ILinkGenerationStrategy} strategy - The strategy to apply.
     * @returns {this} The builder instance for chaining.
     */
    setUriLinkGenerationStrategy(
      platform: StreamingPlatforms,
      strategy: ILinkGenerationStrategy,
    ): this {
      const generator = this.uriGenerators[platform];
      generator.setLinkGenerationStrategy(strategy);
      return this;
    }

    /**
     * Builds and returns the final Song object with the provided configurations.
     *
     * @returns {Song} The constructed Song object.
     */
    build(): Song {
      return new Song(
        this.id,
        this.name,
        this.duration_ms,
        this.artists,
        this.webUrlGenerators,
        this.uriGenerators,
      );
    }
  };
}
