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
import { UsersSymbols } from '../../symbols';
import { IUsersService } from '../interfaces/users.service.interface';

@Controller('users')
export class UsersController {
  constructor(
    @Inject(UsersSymbols.USERS_SERVICE)
    private readonly usersService: IUsersService,
  ) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return 'This action adds a new user';
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
