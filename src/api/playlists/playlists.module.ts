import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PlaylistSchema } from './data/schema/playlist.mongo.schema';
import { SYMBOLS } from 'src/common/symbols';
import { PlaylistsController } from './application/controllers/playlists.controller';
import PlaylistsService from './domain/services/playlists.service';
// import { SongsModule } from '../songs/songs.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: SYMBOLS.PLAYLIST, schema: PlaylistSchema },
    ]),
    // SongsModule,
  ],
  controllers: [PlaylistsController],
  providers: [
    { provide: SYMBOLS.PLAYLISTS_SERVICE, useClass: PlaylistsService },
  ],
  exports: [{ provide: SYMBOLS.PLAYLISTS_SERVICE, useClass: PlaylistsService }],
})
export class PlaylistsModule {}
