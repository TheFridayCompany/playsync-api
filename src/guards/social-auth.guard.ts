import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import ISocialTokenService from 'src/api/auth/domain/interfaces/social-token.service.interface';
import { SYMBOLS } from 'src/common/symbols';

@Injectable()
export class SocialAuthGuard extends AuthGuard('jwt') implements CanActivate {
  constructor(
    @Inject(SYMBOLS.SOCIAL_TOKEN_SERVICE)
    private readonly socialTokenService: ISocialTokenService,
  ) {
    super();
  }

  /**
   * Determines if the request can proceed based on the presence of a valid social authentication token.
   * It verifies the token using Firebase Authentication services and modifies the request body
   * to include the social token if verification is successful.
   *
   * @param context - The execution context containing request information.
   * @returns {Promise<boolean>} A promise that resolves to true if the token is valid,
   *                            or throws an UnauthorizedException if the token is invalid or missing.
   */
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException('No token provided');
    }

    try {
      const decodeToken = await this.socialTokenService.decodeToken(token);

      if (!decodeToken) {
        throw new UnauthorizedException('Could not decode token');
      }

      // Clearing the body and attaching the token as socialToken
      request.body = { socialToken: token };
    } catch (e) {
      throw new UnauthorizedException('Invalid token');
    }
    return true;
  }

  /**
   * Extracts the Bearer token from the Authorization header of the request.
   *
   * @param request - The incoming request object.
   * @returns {string | undefined} The extracted token if present, or undefined if not.
   */
  private extractTokenFromHeader(request: any): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
