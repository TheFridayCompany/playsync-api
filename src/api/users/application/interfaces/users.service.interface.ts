import { User } from '../../domain/models/user.model';

export interface IUsersService {
  createUser(username: string, name: string): Promise<User>;
}
