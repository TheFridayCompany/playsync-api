import { Inject, Injectable } from '@nestjs/common';
import { User } from '../models/user.model';
import { IUsersService } from '../../application/interfaces/users.service.interface';
import { UsersSymbols } from '../../users.symbols';
import { CommonSymbols } from 'src/common/common.symbols';
import IRepository from 'src/common/interfaces/repository.interface';
import { IUniqueIdService } from 'src/common/interfaces/unique-id.service.interface';

@Injectable()
export class UsersService implements IUsersService {
  constructor(
    @Inject(UsersSymbols.USERS_REPOSITORY)
    private readonly userRepository: IRepository<User>,
    @Inject(CommonSymbols.UUID_SERVICE)
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
}
