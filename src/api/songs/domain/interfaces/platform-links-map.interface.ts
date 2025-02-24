import { StreamingPlatforms } from '../models/streaming-platforms.enum';

/**
 * A type representing a map of streaming platform identifiers to their corresponding URLs.
 * Each platform is mapped to a specific URL that can be used to access the streaming service.
 */
export type PlatformLinksMap = Record<StreamingPlatforms, string>;
