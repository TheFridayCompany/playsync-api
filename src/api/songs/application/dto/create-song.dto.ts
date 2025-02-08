import { IsNotEmpty, IsString, Length } from 'class-validator';

export default class CreateSongDto {
  @IsString()
  @IsNotEmpty()
  @Length(3, 50)
  name: string;

  @IsNotEmpty()
  duration: number;

  @IsString()
  @IsNotEmpty()
  @Length(3, 50)
  artist: string;
}
