/**
 * Interface for Authentication Service.
 * Handles authentication-related operations, including token exchange.
 */
export default interface IAuthService {
  /**
   * Exchanges a social authentication token (e.g., from Google, Facebook) for an internal authentication token.
   *
   * @param {string} socialToken - The authentication token received from an external provider.
   * @returns {Promise<{ token: string }>} - A promise that resolves to an object containing the internal authentication token.
   */
  exchangeToken(socialToken: string): Promise<{ token: string }>;
}
