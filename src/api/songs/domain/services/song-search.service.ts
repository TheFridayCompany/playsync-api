import { Inject, Injectable } from '@nestjs/common';
import ISongSearchService from '../../application/interfaces/song-search.service.interface';
import { SYMBOLS } from 'src/common/symbols';
import ISongSearchRepository from '../interfaces/song-search.repository.interface';
import { Song } from '../models/song.model';
import { SongNotFoundError } from 'src/common/errors/song-not-found.error';

@Injectable()
export default class SongSearchService implements ISongSearchService {
  constructor(
    @Inject(SYMBOLS.SONG_SEARCH_REPOSITORY)
    private readonly songSearchRepository: ISongSearchRepository,
  ) {}

  async findOneById(id: string): Promise<Song> {
    const song = await this.songSearchRepository.findById(id);

    if (!song) {
      throw new SongNotFoundError(id);
    }

    return song;
  }

  search(query: string): Promise<any[]> {
    return this.songSearchRepository.find(query);
  }
}
