import { Controller, Post, Body, Inject, UseGuards } from '@nestjs/common';
import { ExchangeTokenDto } from '../dto/exchange-token.dto';
import IAuthService from '../interfaces/auth.service.interface';
import { SYMBOLS } from 'src/common/symbols';
import { SocialAuthGuard } from 'src/guards/social-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject(SYMBOLS.AUTH_SERVICE) private readonly authService: IAuthService,
  ) {}

  @Post('exchange')
  @UseGuards(SocialAuthGuard)
  async exchangeSocialToken(
    @Body() exchangeTokenDto: ExchangeTokenDto,
  ): Promise<any> {
    const { socialToken } = exchangeTokenDto;
    return this.authService.exchangeToken(socialToken);
  }
}
