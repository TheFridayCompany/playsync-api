import { Inject, Injectable } from '@nestjs/common';
import { User } from '../models/user.model';
import IRepository from 'src/common/repository';

@Injectable()
export class UsersService {
  constructor(
    @Inject('UserRepository')
    private readonly userRepository: IRepository<User>,
  ) {}

  async createUser(user: User): Promise<User> {
    return this.userRepository.create(user);
  }
}
