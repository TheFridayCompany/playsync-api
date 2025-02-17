import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import SongsService from './domain/services/song-search.service';
import { SYMBOLS } from 'src/common/symbols';
import SongSearchRepository from './data/repositories/song-search.repository';
import { SongSearchController } from './application/controllers/song-search.controller';
import SpotifySongSearchRepository from './data/repositories/song-search.repository';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [HttpModule, ConfigModule],
  controllers: [SongSearchController],
  providers: [
    { provide: SYMBOLS.SONG_SEARCH_SERVICE, useClass: SongsService },
    {
      provide: SYMBOLS.SONG_SEARCH_REPOSITORY,
      useClass: SpotifySongSearchRepository,
    },
  ],
  exports: [
    { provide: SYMBOLS.SONG_SEARCH_SERVICE, useClass: SongsService },
    { provide: SYMBOLS.SONG_SEARCH_REPOSITORY, useClass: SongSearchRepository },
  ],
})
export class SongsModule {}
