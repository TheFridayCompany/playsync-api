import { Injectable } from '@nestjs/common';
import ISocialTokenService from '../../domain/interfaces/social-token.service.interface';
import * as admin from 'firebase-admin';
import { ConfigService } from '@nestjs/config';

@Injectable()
export default class FirebaseTokenService implements ISocialTokenService {
  constructor(private readonly configService: ConfigService) {
    if (!admin.apps.length) {
      admin.initializeApp({
        credential: admin.credential.cert({
          projectId: this.configService.get<string>('FIREBASE_PROJECT_ID'),
          clientEmail: this.configService.get<string>('FIREBASE_CLIENT_EMAIL'),
          privateKey: this.configService
            .get<string>('FIREBASE_PRIVATE_KEY')
            ?.replace(/\\n/g, '\n'), // Fixes newline issues in env variables
        }),
      });
    }
  }
  async decodeToken(
    socialToken: string,
  ): Promise<{ uniqueSocialIdentifier: string }> {
    const decodedToken = await admin.auth().verifyIdToken(socialToken);

    // TODO: check if decoded token has email; if not use other identifier

    return Promise.resolve({
      uniqueSocialIdentifier: decodedToken.email,
    });
  }
}
