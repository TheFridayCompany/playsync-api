import { IsNotEmpty, IsString, Length } from 'class-validator';

export default class SongSearchDto {
  @IsString()
  @IsNotEmpty()
  @Length(3, 200)
  query: string;
}
