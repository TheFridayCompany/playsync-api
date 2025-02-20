import { IsJWT, IsNotEmpty } from 'class-validator';

/**
 * Data Transfer Object (DTO) for exchanging a social authentication token.
 *
 * This DTO is used to handle the token exchange process from Firebase social authentication.
 *
 * @class ExchangeTokenDto
 */
export class ExchangeTokenDto {
  /**
   * JWT token provided by Firebase social authentication.
   *
   * @type {string}
   * @memberof ExchangeTokenDto
   * @description The social authentication token from Firebase.
   */
  @IsJWT()
  @IsNotEmpty()
  socialToken: string;
}
