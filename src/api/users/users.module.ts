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
    {
      provide: UsersSymbols.USERS_REPOSITORY,
      useClass: UserMongooseRepository,
    },
    { provide: UsersSymbols.USERS_SERVICE, useClass: UsersService },
  ],
  exports: [{ provide: UsersSymbols.USERS_SERVICE, useClass: UsersService }],
})
export class UsersModule {}
