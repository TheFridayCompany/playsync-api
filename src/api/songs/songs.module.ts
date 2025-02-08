import { Module } from '@nestjs/common';
import { SYMBOLS } from 'src/common/symbols';
import SongsService from './domain/services/songs.service';

@Module({
  imports: [],
  providers: [{ provide: SYMBOLS.SONGS_SERVICE, useClass: SongsService }],
  exports: [{ provide: SYMBOLS.SONGS_SERVICE, useClass: SongsService }],
})
export class SongsModule {}
