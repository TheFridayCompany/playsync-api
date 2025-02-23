import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
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

  @Get(':id')
  getUser(@Param('id') id: string) {
    return this.usersService.getUser(id);
  }

  @Get()
  getUsersByUsername(@Query('username') usernameQuery: string) {
    return this.usersSearchService.searchByUsername(usernameQuery.trim());
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    return this.usersService.deleteUser(id);
  }
}
