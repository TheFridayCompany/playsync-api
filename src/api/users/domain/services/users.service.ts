import { Inject, Injectable } from '@nestjs/common';
import { User } from '../models/user.model';
import IRepository from 'src/common/repository';
import { UsersSymbols } from '../../symbols';

@Injectable()
export class UsersService {
  constructor(
    @Inject(UsersSymbols.USERS_REPOSITORY)
    private readonly userRepository: IRepository<User>,
  ) {}

  async createUser(user: User): Promise<User> {
    return this.userRepository.create(user);
  }
}
