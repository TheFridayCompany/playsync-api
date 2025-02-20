import { Injectable } from '@nestjs/common';
import IFirebaseAuthService from '../../domain/interfaces/firebase-auth.service.interface';

@Injectable()
export default class FirebaseAuthService implements IFirebaseAuthService {
  verifyToken(socialToken: string): Promise<boolean> {
    return Promise.resolve(true);
  }
}
