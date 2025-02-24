import { Controller, Post, Inject, UseGuards, Req } from '@nestjs/common';
import IAuthService from '../interfaces/auth.service.interface';
import { SYMBOLS } from 'src/common/symbols';
import { SocialAuthGuard } from 'src/guards/social-auth.guard';
import { RequestWithEmail } from 'src/common/interfaces/request-with-user.interface';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject(SYMBOLS.AUTH_SERVICE) private readonly authService: IAuthService,
  ) {}

  @Post('exchange')
  @UseGuards(SocialAuthGuard)
  async exchangeSocialToken(@Req() request: RequestWithEmail): Promise<any> {
    const { email } = request.user;
    console.log(JSON.stringify(email));
    return this.authService.exchangeToken(email);
  }
}
