import { IsOptional, IsString, Length } from 'class-validator';

export default class UpdatePlaylistDto {
  @IsString()
  @IsOptional()
  @Length(3, 20)
  name?: string;

  @IsString()
  @IsOptional()
  @Length(6, 20)
  description?: string;
}
