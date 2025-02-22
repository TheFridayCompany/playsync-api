import { User } from '../../domain/models/user.model';

export default interface IUsersSearchService {
  searchByUsername(usernameQuery: string): Promise<User[]>;
}
