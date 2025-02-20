import { Controller, Post, Body, Inject } from '@nestjs/common';
import { ExchangeTokenDto } from '../dto/exchange-token.dto';
import IAuthService from '../interfaces/auth.service.interface';
import { SYMBOLS } from 'src/common/symbols';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject(SYMBOLS.AUTH_SERVICE) private readonly authService: IAuthService,
  ) {}

  @Post('exchange')
  async exchangeSocialToken(
    @Body() exchangeTokenDto: ExchangeTokenDto,
  ): Promise<any> {
    const { socialToken } = exchangeTokenDto;
    return this.authService.exchangeToken(socialToken);
  }
}
