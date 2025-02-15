import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FriendRequestSchema } from './data/schema/friend-request.mongo.schema';
import { FriendshipSchema } from './data/schema/friendship.mongo.schema';
import { SYMBOLS } from 'src/common/symbols';
import { FriendRequestService } from './domain/services/friend-request.service';
import { FriendRequestMongoRepository } from './data/repositories/friend-request.mongo.repository';
import { FriendRequestController } from './application/controllers/friend-request.controller';
import { FriendshipController } from './application/controllers/friendship.controller';
import { FriendshipService } from './domain/services/friendship.service';
import { FriendshipMongoRepository } from './data/repositories/friendship.mongo.repository';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'FriendRequest', schema: FriendRequestSchema },
      { name: 'Friendship', schema: FriendshipSchema },
    ]),
    UsersModule,
  ],
  controllers: [FriendRequestController, FriendshipController],
  providers: [
    {
      provide: SYMBOLS.FRIEND_REQUEST_REPOSITORY,
      useClass: FriendRequestMongoRepository,
    },
    { provide: SYMBOLS.FRIEND_REQUEST_SERVICE, useClass: FriendRequestService },
    {
      provide: SYMBOLS.FRIENDSHIP_REPOSITORY,
      useClass: FriendshipMongoRepository,
    },
    { provide: SYMBOLS.FRIENDSHIP_SERVICE, useClass: FriendshipService },
  ],
  exports: [
    { provide: SYMBOLS.FRIENDSHIP_SERVICE, useClass: FriendshipService },
    { provide: SYMBOLS.FRIEND_REQUEST_SERVICE, useClass: FriendRequestService },
  ],
})
export class FriendsModule {}
