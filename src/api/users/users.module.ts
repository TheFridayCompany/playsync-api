import { Module } from '@nestjs/common';
import { UsersService } from './domain/services/users.service';
import { UsersController } from './application/controllers/users.controller';
import { UserMongooseRepository } from './data/repositories/user.mongo.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './data/schema/user.mongo.schema';
import { SYMBOLS } from 'src/common/symbols';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: SYMBOLS.USER, schema: UserSchema }]),
  ],
  controllers: [UsersController],
  providers: [
    {
      provide: SYMBOLS.USERS_REPOSITORY,
      useClass: UserMongooseRepository,
    },
    { provide: SYMBOLS.USERS_SERVICE, useClass: UsersService },
  ],
  exports: [{ provide: SYMBOLS.USERS_SERVICE, useClass: UsersService }],
})
export class UsersModule {}
