import { Controller, Get, Inject, Query } from '@nestjs/common';
import { SYMBOLS } from 'src/common/symbols';
import ISongSearchService from '../interfaces/song-search.service.interface';
import SongSearchDto from '../dto/song-search.dto';

@Controller('songs')
export class SongSearchController {
  constructor(
    @Inject(SYMBOLS.SONG_SEARCH_SERVICE)
    private readonly songSearchService: ISongSearchService,
  ) {}

  @Get()
  getUser(@Query() dto: SongSearchDto) {
    return this.songSearchService.search(dto.query);
  }
}
