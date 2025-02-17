import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PlaylistSchema } from './data/schema/playlist.mongo.schema';
import { SYMBOLS } from 'src/common/symbols';
import { PlaylistsController } from './application/controllers/playlists.controller';
import PlaylistsService from './domain/services/playlists.service';
import PlaylistCollaborationService from './domain/services/playlist-collaboration.service';
import PlaylistSongsService from './domain/services/playlist-songs.service';
import { PlaylistSongsController } from './application/controllers/playlist-songs.controller';
import { PlaylistCollaborationController } from './application/controllers/playlist-collaboration.controller';
import PlaylistMongoRepository from './data/repositories/playlists.repository';
import { FriendsModule } from '../friends/friends.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: SYMBOLS.PLAYLIST, schema: PlaylistSchema },
    ]),
    FriendsModule,
    // SongsModule,
  ],
  controllers: [
    PlaylistsController,
    PlaylistSongsController,
    PlaylistCollaborationController,
  ],
  providers: [
    { provide: SYMBOLS.PLAYLISTS_SERVICE, useClass: PlaylistsService },
    {
      provide: SYMBOLS.PLAYLIST_COLLABORATION_SERVICE,
      useClass: PlaylistCollaborationService,
    },
    { provide: SYMBOLS.PLAYLIST_SONGS_SERVICE, useClass: PlaylistSongsService },
    {
      provide: SYMBOLS.PLAYLISTS_REPOSITORY,
      useClass: PlaylistMongoRepository,
    },
  ],
  exports: [
    { provide: SYMBOLS.PLAYLISTS_SERVICE, useClass: PlaylistsService },
    {
      provide: SYMBOLS.PLAYLIST_COLLABORATION_SERVICE,
      useClass: PlaylistCollaborationService,
    },
    { provide: SYMBOLS.PLAYLIST_SONGS_SERVICE, useClass: PlaylistSongsService },
  ],
})
export class PlaylistsModule {}
