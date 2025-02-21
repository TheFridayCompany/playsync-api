import { ILinkGenerationStrategy } from '../interfaces/link-generation-strategy.interface';
import { PlatformLinksMap } from '../interfaces/platform-links-map.interface';
import SongNameAndArtistsNamesSearchStrategy from '../services/link-builders/platforms/web/strategies/name-artist-name-search-strategy';
import { Artist } from './artist.model';
import AppleMusicMobileLinkGenerator from './link-builders/platforms/mobile/apple-music-mobile-link.generator';
import YoutubeMusicMobileLinkGenerator from './link-builders/platforms/mobile/youtube-music-mobile-link.generator';
import AppleMusicWebLinkGenerator from './link-builders/platforms/web/apple-music-web-link.generator';
import SpotifyWebLinkGenerator from './link-builders/platforms/web/spotify-web-link.generator';
import IdSpecificLinkStrategy from './link-builders/platforms/web/strategies/id-specific-link.strategy';
import YoutubeMusicWebLinkGenerator from './link-builders/platforms/web/youtube-music-web-link.generator';
import AbstractStreamingPlatformLinkGenerator from './link-builders/streaming-platform-link-generator';
import { StreamingPlatforms } from './streaming-platforms.enum';

export class Song {
  public readonly web_urls: PlatformLinksMap;
  public readonly uris: PlatformLinksMap;

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
    // Initialize web_urls and uris by using the generators
    this.web_urls = this.generateLinks(webUrlGenerators);
    this.uris = this.generateLinks(uriGenerators);
  }

  // Helper method to generate links for each platform
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

  // Static builder class to construct Song objects
  static Builder = class {
    public id: string;
    public name: string;
    public duration_ms: number;
    public artists: Artist[];
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

    // Constructor to initialize required fields
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

    // Setters for one platform's link generator at a time
    setWebUrlGenerator(
      platform: StreamingPlatforms,
      generator: AbstractStreamingPlatformLinkGenerator,
    ): this {
      this.webUrlGenerators[platform] = generator;
      return this;
    }

    setUriGenerator(
      platform: StreamingPlatforms,
      generator: AbstractStreamingPlatformLinkGenerator,
    ): this {
      this.uriGenerators[platform] = generator;
      return this;
    }

    // Setters for optional properties
    setWebUrlGenerators(generators: {
      [platform in StreamingPlatforms]: AbstractStreamingPlatformLinkGenerator;
    }): this {
      this.webUrlGenerators = generators;
      return this;
    }

    setUriGenerators(generators: {
      [platform in StreamingPlatforms]: AbstractStreamingPlatformLinkGenerator;
    }): this {
      this.uriGenerators = generators;
      return this;
    }

    // Setters for link generation strategies
    setWebUrlLinkGenerationStrategy(
      platform: StreamingPlatforms,
      strategy: ILinkGenerationStrategy,
    ): this {
      const generator = this.webUrlGenerators[platform];
      generator.setLinkGenerationStrategy(strategy);
      return this;
    }

    setUriLinkGenerationStrategy(
      platform: StreamingPlatforms,
      strategy: ILinkGenerationStrategy,
    ): this {
      const generator = this.uriGenerators[platform];
      generator.setLinkGenerationStrategy(strategy); // Assuming generators implement setStrategy
      return this;
    }

    // Build method that constructs the Song object
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
