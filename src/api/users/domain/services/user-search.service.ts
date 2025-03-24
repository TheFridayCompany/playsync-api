import { Inject, Injectable } from '@nestjs/common';
import { User } from '../models/user.model';
import { SYMBOLS } from 'src/common/symbols';
import IUsersSearchService from '../../application/interfaces/users-search.service.interface';
import IUsersRepository from '../interfaces/users-repository.interface';

@Injectable()
export class UsersSearchService implements IUsersSearchService {
  private user: User;

  constructor(
    @Inject(SYMBOLS.USERS_REPOSITORY)
    private readonly userRepository: IUsersRepository,
  ) {}

  forUser(user: User): IUsersSearchService {
    this.user = user;
    return this;
  }

  async searchByUsername(usernameQuery: string): Promise<User[]> {
    const searchResults =
      await this.userRepository.findByUsername(usernameQuery);
    return searchResults.filter((user) => user.id !== this.user.id);
  }
}
