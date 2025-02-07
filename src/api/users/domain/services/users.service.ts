import { Inject, Injectable } from '@nestjs/common';
import { User } from '../models/user.model';
import IRepository from 'src/common/interfaces/repository.interface';
import { UsersSymbols } from '../../symbols';
import { IUsersService } from '../../application/interfaces/users.service.interface';

@Injectable()
export class UsersService implements IUsersService {
  constructor(
    @Inject(UsersSymbols.USERS_REPOSITORY)
    private readonly userRepository: IRepository<User>,
  ) {}

  async createUser(user: User): Promise<User> {
    // check if username is already taken using a bloom filter

    return this.userRepository.create(user);
  }
}
