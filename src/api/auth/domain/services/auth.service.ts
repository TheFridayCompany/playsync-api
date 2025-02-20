import { Inject, Injectable } from '@nestjs/common';
import IAuthService from '../../application/interfaces/auth.service.interface';
import { SYMBOLS } from 'src/common/symbols';
import IFirebaseAuthService from '../interfaces/firebase-auth.service.interface';
import { ConfigService } from '@nestjs/config';
import { generateJwtToken } from 'src/common/utils';

@Injectable()
export default class AuthService implements IAuthService {
  constructor(
    @Inject(SYMBOLS.FIREBASE_AUTH_SERVICE)
    private readonly firebaseAuthService: IFirebaseAuthService,
    private readonly configService: ConfigService,
  ) {}

  async exchangeToken(socialToken: string): Promise<any> {
    const isValidToken =
      await this.firebaseAuthService.verifyToken(socialToken);

    if (!isValidToken) {
      throw new Error('Invalid social token');
    }

    return generateJwtToken(
      { email },
      this.configService.get('JWT_SECRET'),
      this.configService.get('JWT_EXPIRY_IN_SECONDS'),
    );
  }
}
