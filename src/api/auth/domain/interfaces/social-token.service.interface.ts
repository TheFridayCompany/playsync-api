/**
 * Interface for Social Token Service.
 * Provides functionality to decode social authentication tokens from external providers.
 */
export default interface ISocialTokenService {
  /**
   * Decodes a social authentication token and extracts a unique identifier associated with the user.
   *
   * @param {string} socialToken - The authentication token issued by an external provider (e.g., Google, Facebook).
   * @returns {Promise<{ uniqueSocialIdentifier: string | null }>} - A promise that resolves to an object containing the unique identifier extracted from the token, or `null` if decoding fails.
   */
  decodeToken(
    socialToken: string,
  ): Promise<{ uniqueSocialIdentifier: string | null }>;
}
