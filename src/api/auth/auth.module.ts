import { Module } from '@nestjs/common';
import { SYMBOLS } from 'src/common/symbols';
import AuthService from './domain/services/auth.service';
import { AuthController } from './application/controllers/auth.controller';
import FirebaseTokenService from './data/repositories/firebase-token.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  controllers: [AuthController],
  providers: [
    { provide: SYMBOLS.AUTH_SERVICE, useClass: AuthService },
    { provide: SYMBOLS.SOCIAL_TOKEN_SERVICE, useClass: FirebaseTokenService },
  ],
  exports: [
    { provide: SYMBOLS.AUTH_SERVICE, useClass: AuthService },
    { provide: SYMBOLS.SOCIAL_TOKEN_SERVICE, useClass: FirebaseTokenService },
  ],
})
export class AuthModule {}
