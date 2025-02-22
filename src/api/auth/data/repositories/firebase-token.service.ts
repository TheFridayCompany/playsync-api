import { Injectable } from '@nestjs/common';
import ISocialTokenService from '../../domain/interfaces/social-token.service.interface';

@Injectable()
export default class FirebaseTokenService implements ISocialTokenService {
  decodeToken(
    socialToken: string,
  ): Promise<{ uniqueSocialIdentifier: string }> {
    return Promise.resolve({
      uniqueSocialIdentifier: 'rohandewangdave@gmail.com',
    });
  }
}
