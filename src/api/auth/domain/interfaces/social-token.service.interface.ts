export default interface ISocialTokenService {
  decodeToken(
    socialToken: string,
  ): Promise<{ uniqueSocialIdentifier: string | null }>;
}
