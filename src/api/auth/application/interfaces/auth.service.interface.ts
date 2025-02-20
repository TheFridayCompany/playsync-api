export default interface IAuthService {
  exchangeToken(socialToken: string): Promise<any>;
}
