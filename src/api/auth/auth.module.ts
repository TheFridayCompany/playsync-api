import { Module } from '@nestjs/common';
import { SYMBOLS } from 'src/common/symbols';
import AuthService from './domain/services/auth.service';
import { AuthController } from './application/controllers/auth.controller';
import FirebaseAuthService from './data/repositories/firebase-auth.service';

@Module({
  controllers: [AuthController],
  providers: [
    { provide: SYMBOLS.AUTH_SERVICE, useClass: AuthService },
    { provide: SYMBOLS.FIREBASE_AUTH_SERVICE, useClass: FirebaseAuthService },
  ],
  exports: [
    { provide: SYMBOLS.AUTH_SERVICE, useClass: AuthService },
    { provide: SYMBOLS.FIREBASE_AUTH_SERVICE, useClass: FirebaseAuthService },
  ],
})
export class AuthModule {}
