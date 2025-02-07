import { User } from '../../domain/models/user.model';

export interface IUsersService {
  createUser(user: User): Promise<User>;
}
