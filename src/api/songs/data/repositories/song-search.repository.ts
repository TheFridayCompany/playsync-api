import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import ISongSearchRepository from '../../domain/interfaces/song-search.repository.interface';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import ISpotifySearchResponse, {
  ISpotifyItemResponse,
} from '../interfaces/spotify-search-response.interface';
import { Song } from '../../domain/models/song.model';
import { Artist } from '../../domain/models/artist.model';
import { StreamingPlatforms } from '../../domain/models/streaming-platforms.enum';

@Injectable()
export default class SpotifySongSearchRepository
  implements ISongSearchRepository
{
  private clientId: string;
  private clientSecret: string;
  private tokenUrl = 'https://accounts.spotify.com/api/token';
  private searchUrl = 'https://api.spotify.com/v1/search';
  private trackUrl = 'https://api.spotify.com/v1/tracks';

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.clientId =
      this.configService.get<string>('SPOTIFY_CLIENT_ID') || 'YOUR_CLIENT_ID';
    this.clientSecret =
      this.configService.get<string>('SPOTIFY_CLIENT_SECRET') ||
      'YOUR_CLIENT_SECRET';
  }

  async findById(id: string): Promise<Song | null> {
    const accessToken = await this.getAccessToken();

    try {
      const response =
        await this.httpService.axiosRef.get<ISpotifyItemResponse>(
          this.buildTrackUrl(id),
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          },
        );

      return this.toDomain(response.data);
    } catch (error) {
      console.error(error);
      throw new HttpException(
        `Spotify search failed: ${error.response?.data?.error?.message || error.message}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  private async getAccessToken(): Promise<string> {
    const authHeader = Buffer.from(
      `${this.clientId}:${this.clientSecret}`,
    ).toString('base64');

    const requestBody = new URLSearchParams();
    requestBody.append('grant_type', 'client_credentials');

    try {
      const response = await this.httpService.axiosRef.post(
        this.tokenUrl,
        requestBody.toString(),
        {
          headers: {
            Authorization: `Basic ${authHeader}`,
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        },
      );

      return response.data.access_token;
    } catch (error) {
      throw new Error(
        `Failed to retrieve Spotify access token: ${error.message}`,
      );
    }
  }

  async find(query: string): Promise<Song[]> {
    const accessToken = await this.getAccessToken();

    try {
      const response =
        await this.httpService.axiosRef.get<ISpotifySearchResponse>(
          this.searchUrl,
          {
            headers: { Authorization: `Bearer ${accessToken}` },
            params: { q: query, type: 'track' },
          },
        );

      return response.data.tracks.items.map((song) => this.toDomain(song));
    } catch (error) {
      console.error(error);
      throw new HttpException(
        `Spotify search failed: ${error.response?.data?.error?.message || error.message}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  private buildTrackUrl(id: string): string {
    return this.trackUrl + `/${id}`;
  }

  private toDomain(song: ISpotifyItemResponse): Song {
    // TODO: add the uris and web urls for other platforms
    const {
      id,
      name,
      duration_ms,
      // uri: spotify_uri,
      // external_urls,
      artists,
    } = song;

    return new Song.Builder(
      id,
      name,
      duration_ms,
      artists.map((artist) => new Artist(artist.id, artist.name)),
    ).build();
  }
}
