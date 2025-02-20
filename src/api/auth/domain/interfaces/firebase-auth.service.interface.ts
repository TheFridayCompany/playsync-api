export default interface IFirebaseAuthService {
  verifyToken(socialToken: string): Promise<boolean>;
}
