import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { UsersService } from '../../domain/services/users.service';
import CreateUserDto from '../dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

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
