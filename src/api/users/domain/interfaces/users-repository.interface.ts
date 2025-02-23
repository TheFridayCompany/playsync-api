import IRepository from 'src/common/interfaces/repository.interface';
import { User } from '../models/user.model';

export default interface IUsersRepository extends IRepository<User> {
  findByUsername(usernameQuery: string): Promise<User[]>;

  findByEmail(email: string): Promise<User>;
}
