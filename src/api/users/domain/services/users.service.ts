import { Inject, Injectable } from '@nestjs/common';
import { User } from '../models/user.model';
import { IUsersService } from '../../application/interfaces/users.service.interface';
import IRepository from 'src/common/interfaces/repository.interface';
import { IUniqueIdService } from 'src/common/interfaces/unique-id.service.interface';
import { SYMBOLS } from 'src/common/symbols';
import { UserNotFoundError } from 'src/common/errors/user-not-found.error';

@Injectable()
export class UsersService implements IUsersService {
  constructor(
    @Inject(SYMBOLS.USERS_REPOSITORY)
    private readonly userRepository: IRepository<User>,
    @Inject(SYMBOLS.UUID_SERVICE)
    private readonly uniqueIdService: IUniqueIdService,
  ) {}

  async createUser(username: string, name: string): Promise<User> {
    // TODO: check if username is already taken using a bloom filter; if it is, throw an error

    // generate a unique id
    const id = this.uniqueIdService.generate();

    // create a new user object
    const user = new User(id, username, name);

    // persist user object in the database
    return this.userRepository.create(user);
  }

  async deleteUser(id: string): Promise<void> {
    const didDelete = await this.userRepository.delete(id);
    if (!didDelete) throw new UserNotFoundError(id);
  }

  async getUser(id: string): Promise<User> {
    const user = await this.userRepository.findOne(id);
    if (!user) throw new UserNotFoundError(id);
    return user;
  }
}
