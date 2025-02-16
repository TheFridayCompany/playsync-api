import { Module } from '@nestjs/common';
import { UsersModule } from './api/users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { FriendsModule } from './api/friends/friends.module';
import { PlaylistsModule } from './api/playlists/playlists.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
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
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
