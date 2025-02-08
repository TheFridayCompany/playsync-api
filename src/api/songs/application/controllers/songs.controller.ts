import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
} from '@nestjs/common';
import { SYMBOLS } from 'src/common/symbols';
import ISongsService from '../interfaces/songs.service.interface';
import CreateSongDto from '../dto/create-song.dto';

@Controller('songs')
export class SongsController {
  constructor(
    @Inject(SYMBOLS.SONGS_SERVICE)
    private readonly songsService: ISongsService,
  ) {}

  @Post()
  create(@Body() createSongDto: CreateSongDto) {
    // const { username, name } = createUserDto;
    // return this.usersService.createUser(username, name);
  }

  @Get(':id')
  getSong(@Param('id') id: string) {
    // return this.usersService.getUser(id);
  }

  @Delete(':id')
  deleteSong(@Param('id') id: string) {
    // return this.usersService.deleteUser(id);
  }
}
