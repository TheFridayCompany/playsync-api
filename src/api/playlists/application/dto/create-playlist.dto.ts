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

/**
 * Data transfer object for creating a playlist.
 * This class defines the structure of the request body required
 * to create a new playlist, including details such as name, description,
 * collaborators, and visibility.
 */
export default class CreatePlaylistDto {
  /**
   * The name of the playlist.
   * This is a required field and must be a string between 3 and 20 characters.
   *
   * @example "My Favorite Songs"
   *
   * @type {string}
   * @memberof CreatePlaylistDto
   */
  @IsString()
  @IsNotEmpty()
  @Length(3, 20)
  name: string;

  /**
   * The description of the playlist.
   * This is an optional field and must be a string between 6 and 20 characters.
   *
   * @example "A collection of my top tracks."
   *
   * @type {string}
   * @memberof CreatePlaylistDto
   */
  @IsString()
  @IsOptional()
  @Length(6, 20)
  description?: string;

  /**
   * A list of collaborator IDs for the playlist.
   * This is an optional field. If provided, each ID must be a valid MongoDB ID.
   *
   * @example ["60b8b24185b3bc001c8f532f", "60b8b24185b3bc001c8f5330"]
   *
   * @type {string[]}
   * @memberof CreatePlaylistDto
   */
  @IsArray()
  @IsOptional()
  @IsMongoId({ each: true })
  collaboratorIds?: string[];

  /**
   * The visibility of the playlist.
   * This field is optional, and if provided, it must be one of the values from the PlaylistVisibility enum.
   *
   * @example PlaylistVisibility.PUBLIC
   *
   * @type {PlaylistVisibility}
   * @memberof CreatePlaylistDto
   */
  @IsEnum(PlaylistVisibility)
  @IsNotEmpty()
  visibility?: PlaylistVisibility;
}
