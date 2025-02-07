import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
} from '@nestjs/common';
import CreateUserDto from '../dto/create-user.dto';
import { IUsersService } from '../interfaces/users.service.interface';
import { SYMBOLS } from 'src/common/symbols';

@Controller('users')
export class UsersController {
  constructor(
    @Inject(SYMBOLS.USERS_SERVICE)
    private readonly usersService: IUsersService,
  ) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    const { username, name } = createUserDto;

    return this.usersService.createUser(username, name);
  }

  @Get(':id')
  getUser(@Param('id') id: string) {
    return `This action returns a #${id} user`;
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    return `This action removes a #${id} user`;
  }
}
