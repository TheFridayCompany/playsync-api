import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthGuard } from '@nestjs/passport';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') implements CanActivate {
  constructor(private readonly configService: ConfigService) {
    super();
  }

  /**
   * Determines if the current request is allowed to proceed.
   *
   * @param context - The execution context containing request information.
   * @returns {Promise<boolean>} A promise that resolves to true if the request is allowed, otherwise throws an exception.
   */
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    console.log(request.path);

    // Allow requests to /auth/exchange without authentication
    if (request.path === '/auth/exchange') {
      return true;
    }

    const jwtSecret: string | undefined =
      this.configService.get<string>('JWT_SECRET_KEY');

    if (!jwtSecret) {
      throw new BadRequestException('Missing JWT Secret');
    }

    const token = this.extractTokenFromHeader(request);

    console.log('token in jwt auth guard: ' + token);

    if (!token) {
      throw new UnauthorizedException('No token found in headers');
    }

    try {
      const decodedToken = jwt.verify(token, jwtSecret);
      console.log(JSON.stringify(decodedToken));
      request.user = {
        email: decodedToken['uniqueSocialIdentifier'] || decodedToken['email'],
      };
      return true;
      // const user = await this.usersService.getUserByEmail(
      //   decodedToken['uniqueSocialIdentifier'],
      // );
      // request.user = user;
    } catch (e) {
      console.error(e);
      throw new UnauthorizedException();
    }
  }

  /**
   * Extracts the JWT token from the Authorization header of the request.
   *
   * @param request - The HTTP request object.
   * @returns {string | undefined} The extracted token or undefined if not found.
   */
  private extractTokenFromHeader(request: any): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
