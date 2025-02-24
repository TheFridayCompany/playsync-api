import { Inject, Injectable } from '@nestjs/common';
import IAuthService from '../../application/interfaces/auth.service.interface';
import { SYMBOLS } from 'src/common/symbols';
import { ConfigService } from '@nestjs/config';
import { generateJwtToken } from 'src/common/utils';

@Injectable()
export default class AuthService implements IAuthService {
  constructor(private readonly configService: ConfigService) {}

  async exchangeToken(email: string): Promise<{ token: string }> {
    return {
      token: generateJwtToken(
        { email },
        this.configService.get('JWT_SECRET_KEY'),
        this.configService.get('JWT_EXPIRY_IN_SECONDS'),
      ),
    };
  }
}
