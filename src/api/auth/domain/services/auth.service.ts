import { Inject, Injectable } from '@nestjs/common';
import IAuthService from '../../application/interfaces/auth.service.interface';
import { SYMBOLS } from 'src/common/symbols';
import { ConfigService } from '@nestjs/config';
import { generateJwtToken } from 'src/common/utils';
import ISocialTokenService from '../interfaces/social-token.service.interface';

@Injectable()
export default class AuthService implements IAuthService {
  constructor(
    @Inject(SYMBOLS.SOCIAL_TOKEN_SERVICE)
    private readonly socialTokenService: ISocialTokenService,
    private readonly configService: ConfigService,
  ) {}

  async exchangeToken(socialToken: string): Promise<any> {
    const decodedToken = await this.socialTokenService.decodeToken(socialToken);

    if (!decodedToken) {
      throw new Error('Invalid social token');
    }

    const { uniqueSocialIdentifier } = decodedToken;

    return {
      token: generateJwtToken(
        { uniqueSocialIdentifier },
        this.configService.get('JWT_SECRET'),
        this.configService.get('JWT_EXPIRY_IN_SECONDS'),
      ),
    };
  }
}
