import { Inject, Injectable } from '@nestjs/common';
import ISongSearchService from '../../application/interfaces/song-search.service.interface';
import { SYMBOLS } from 'src/common/symbols';
import ISongSearchRepository from '../interfaces/song-search.repository.interface';

@Injectable()
export default class SongSearchService implements ISongSearchService {
  constructor(
    @Inject(SYMBOLS.SONG_SEARCH_REPOSITORY)
    private readonly songSearchRepository: ISongSearchRepository,
  ) {}

  search(query: string): Promise<any[]> {
    return this.songSearchRepository.find(query);
  }
}
