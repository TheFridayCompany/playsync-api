import IStreamingPlatformLinkBuilder from '../../interfaces/external-platform-link-builder.interface';
import { ILinkGenerationStrategy } from '../../interfaces/link-generation-strategy.interface';
import { Song } from '../../models/song.model';

export default abstract class AbstractStreamingPlatformLinkGenerator
  implements IStreamingPlatformLinkBuilder
{
  // Private variable to store the link generation strategy
  protected linkGenerationStrategy: ILinkGenerationStrategy;

  constructor(linkGenerationStrategy: ILinkGenerationStrategy) {
    this.linkGenerationStrategy = linkGenerationStrategy;
  }

  // Abstract method to be implemented by subclasses
  abstract generate(song: Song): string;

  // Setter method to change the link generation strategy
  setLinkGenerationStrategy(
    linkGenerationStrategy: ILinkGenerationStrategy,
  ): void {
    this.linkGenerationStrategy = linkGenerationStrategy;
  }
}
