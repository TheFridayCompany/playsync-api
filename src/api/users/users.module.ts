import { Module } from '@nestjs/common';
import { UsersService } from './domain/services/users.service';
import { UsersController } from './application/controllers/users.controller';
import { UserMongooseRepository } from './data/repositories/user.mongo.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './data/schema/user.mongo.schema';
import { UsersSymbols } from './symbols';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UsersSymbols.USER, schema: UserSchema },
    ]),
  ],
  controllers: [UsersController],
  providers: [
    UsersService,
    {
      provide: UsersSymbols.USERS_REPOSITORY,
      useClass: UserMongooseRepository,
    },
  ],
  exports: [UsersService],
})
export class UsersModule {}
