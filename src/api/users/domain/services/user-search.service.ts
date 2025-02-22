import { Inject, Injectable } from '@nestjs/common';
import { User } from '../models/user.model';
import IRepository from 'src/common/interfaces/repository.interface';
import { SYMBOLS } from 'src/common/symbols';
import IUsersSearchService from '../../application/interfaces/users-search.service.interface';
import IUsersRepository from '../interfaces/users-repository.interface';

@Injectable()
export class UsersSearchService implements IUsersSearchService {
  constructor(
    @Inject(SYMBOLS.USERS_REPOSITORY)
    private readonly userRepository: IUsersRepository,
  ) {}

  searchByUsername(usernameQuery: string): Promise<User[]> {
    return this.userRepository.findByUsername(usernameQuery);
  }
}
