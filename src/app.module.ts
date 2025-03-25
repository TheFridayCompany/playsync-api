import { Module } from '@nestjs/common';
import { UsersModule } from './api/users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { FriendsModule } from './api/friends/friends.module';
import { PlaylistsModule } from './api/playlists/playlists.module';
import { SongsModule } from './api/songs/songs.module';
import { AuthModule } from './api/auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  imports: [
    ConfigModule.forRoot(),
    EventEmitterModule.forRoot(),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: `mongodb+srv://${configService.get('MONGODB_USERNAME')}:${configService.get('MONGODB_PASSWORD')}@playsync.b37nb.mongodb.net/?retryWrites=true&w=majority&appName=${configService.get('MONGODB_APP_NAME')}`,
      }),
      inject: [ConfigService],
    }),
    UsersModule,
    PlaylistsModule,
    FriendsModule,
    SongsModule,
    AuthModule,
  ],
  providers: [{ provide: APP_GUARD, useClass: JwtAuthGuard }],
})
export class AppModule {}
