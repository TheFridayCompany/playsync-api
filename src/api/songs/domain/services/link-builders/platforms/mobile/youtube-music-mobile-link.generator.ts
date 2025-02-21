import { Song } from 'src/api/songs/domain/models/song.model';
import { StreamingPlatforms } from 'src/api/songs/domain/models/streaming-platforms.enum';
import AbstractStreamingPlatformLinkGenerator from '../../streaming-platform-link-generator';

export default class YoutubeMusicMobileLinkGenerator extends AbstractStreamingPlatformLinkGenerator {
  generate(song: Song): string {
    return this.linkGenerationStrategy.generateLink(
      song,
      StreamingPlatforms.YoutubeMusic,
    );
  }
}
