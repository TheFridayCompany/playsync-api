import {
  IsArray,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { PlaylistVisibility } from '../../domain/models/playlist.model';

export default class CreatePlaylistDto {
  @IsString()
  @IsNotEmpty()
  @Length(3, 20)
  name: string;

  @IsString()
  @IsOptional()
  @Length(6, 20)
  description?: string;

  @IsArray()
  @IsOptional()
  @IsMongoId({ each: true })
  collaboratorIds?: string[];

  @IsEnum(PlaylistVisibility)
  @IsNotEmpty()
  visibility?: PlaylistVisibility;
}
