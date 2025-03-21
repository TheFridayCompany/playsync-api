import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import CreateUserDto from '../dto/create-user.dto';
import { IUsersService } from '../interfaces/users.service.interface';
import { SYMBOLS } from 'src/common/symbols';
import IUsersSearchService from '../interfaces/users-search.service.interface';
import { RequestWithEmail } from 'src/common/interfaces/request-with-user.interface';

@Controller('users')
export class UsersController {
  constructor(
    @Inject(SYMBOLS.USERS_SERVICE)
    private readonly usersService: IUsersService,
    @Inject(SYMBOLS.USERS_SEARCH_SERVICE)
    private readonly usersSearchService: IUsersSearchService,
  ) {}

  @Post()
  create(
    @Req() request: RequestWithEmail,
    @Body() createUserDto: CreateUserDto,
  ) {
    const { username, name } = createUserDto;
    const { user } = request;

    return this.usersService.createUser(username, name, user.email);
  }

  @Get()
  getUser(@Req() request: RequestWithEmail) {
    console.log(JSON.stringify(request.user));
    const { email } = request.user;
    console.log('inside controller: ', email);

    return this.usersService.getUserByEmail(email);
  }

  @Get()
  getUsersByUsername(@Query('username') usernameQuery: string) {
    return this.usersSearchService.searchByUsername(usernameQuery.trim());
  }

  @Delete()
  async deleteUser(@Req() request: RequestWithEmail) {
    const { user: u } = request;
    const user = await this.usersService.getUserByEmail(u.email);
    return this.usersService.deleteUser(user.id);
  }
}
